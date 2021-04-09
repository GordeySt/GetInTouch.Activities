using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtGenerator _jwtGenerator;

        public UserController(UserManager<AppUser> userManager, IConfiguration config,
            IJwtGenerator jwtGenerator)
        {
            _jwtGenerator = jwtGenerator;
            _userManager = userManager;
            _config = config;
            _httpClient = new HttpClient
            {
                BaseAddress = new System.Uri("https://graph.facebook.com")
            };
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command)
        {
            var user = await Mediator.Send(command);
            SetTokenCookie(user.RefreshToken);

            return user;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<User>> CurrentUser()
        {
            var user = await Mediator.Send(new CurrentUser.Query());
            SetTokenCookie(user.RefreshToken);

            return user;
        }

        [AllowAnonymous]
        [HttpPost("fbLogin")]
        public async Task<ActionResult<User>> FacebookLogin(string accessToken)
        {
            var fbVerifyKeys = _config["Facebook:AppId"] + "|" + _config["Facebook:AppSecret"];

            var verifyToken = await _httpClient
                .GetAsync($"debug_token?input_token={accessToken}&access_token={fbVerifyKeys}");

            if (!verifyToken.IsSuccessStatusCode) return Unauthorized();

            var fbUrl = $"me?access_token={accessToken}&fields=name,email,picture.width(100).height(100)";

            var response = await _httpClient.GetAsync(fbUrl);

            if (!response.IsSuccessStatusCode) return Unauthorized();

            var fbInfo = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());

            var username = (string)fbInfo.id;

            var user = await _userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == username);

            var refreshToken = _jwtGenerator.GenerateRefreshToken();
            User userToReturn;

            if (user != null)
            {
                user.RefreshTokens.Add(refreshToken);
                await _userManager.UpdateAsync(user);
                userToReturn = new User(user, _jwtGenerator, refreshToken.Token);
                SetTokenCookie(userToReturn.RefreshToken);
                return Ok(userToReturn);
            }

            user = new AppUser
            {
                DisplayedName = (string)fbInfo.name,
                Email = (string)fbInfo.email,
                UserName = (string)fbInfo.id,
                Photos = new List<Photo>
            {
                new Photo
                {
                    Id = "fb_" + (string)fbInfo.id,
                    Url = (string)fbInfo.picture.data.url,
                    IsMain = true
                }}
            };

            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded) return BadRequest("Problem creating user account");

            userToReturn = new User(user, _jwtGenerator, refreshToken.Token);
            SetTokenCookie(userToReturn.RefreshToken);
            return Ok(userToReturn);
        }

        [HttpPost("refreshToken")]
        public async Task<ActionResult<User>> RefreshToken(Application.User.RefreshToken.Command command)
        {
            command.RefreshToken = Request.Cookies["refreshToken"];
            var user = await Mediator.Send(command);
            SetTokenCookie(user.RefreshToken);

            return Ok(user);
        }

        private void SetTokenCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7),
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }
    }
}