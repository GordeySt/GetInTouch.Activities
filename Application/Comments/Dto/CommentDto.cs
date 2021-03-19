using System;

namespace Application.Comments.Dto
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserName { get; set; }
        public string DisplayedName { get; set; }
        public string Image { get; set; }
    }
}