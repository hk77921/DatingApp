namespace DatingApp.API.Models
{
    public class User
    {
        public int ID { get; set; } 
        public string Username { get; set; }
        public byte[] passwordHash { get; set; }
        public byte[] SaltHash { get; set; }    
    }
}