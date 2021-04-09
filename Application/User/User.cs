using System.Linq;
using System.Text.Json.Serialization;
using Application.Interfaces;
using Domain;

namespace Application.User
{
    public class User
    {
        public User(AppUser user, IJwtGenerator jwtGenerator, string refreshToken)
        {
            DisplayedName = user.DisplayedName;
            Token = jwtGenerator.CreateToken(user);
            UserName = user.UserName;
            Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url;
            RefreshToken = refreshToken;
        }

        public string DisplayedName { get; set; }
        public string Token { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }

        [JsonIgnore]
        public string RefreshToken { get; set; }
    }
}