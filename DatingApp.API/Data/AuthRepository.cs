using System;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _Context;

        public AuthRepository(DataContext Context)
        {
            _Context = Context;

        }
        public async Task<User> Login(string username, string password)
        {

            var user = await _Context.Users.FirstOrDefaultAsync(x => x.Username == username);

            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.passwordHash, user.SaltHash))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] saltHash)
        {

            using (var hmac = new System.Security.Cryptography.HMACSHA512(saltHash))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for (int i = 0; i < computedHash.Length - 1; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }
                return true;
            }
        }
            public async Task<User> Register(User user, string password)
            {
                byte[] passwordHash, passwordSalt;

                createPasswordHash(password, out passwordHash, out passwordSalt);
                user.passwordHash = passwordHash;
                user.SaltHash = passwordSalt;

                await _Context.Users.AddAsync(user);
                await _Context.SaveChangesAsync();

                return user;

            }

            public async Task<bool> UserExist(string username)
            {
                if(await _Context.Users.AnyAsync(x => x.Username ==username)) 
                    return true;
                
                return false;
            }

            private void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
            {
                using (var hmac = new System.Security.Cryptography.HMACSHA512())
                {
                    passwordSalt = hmac.Key;
                    passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                }
            }
        }
    }