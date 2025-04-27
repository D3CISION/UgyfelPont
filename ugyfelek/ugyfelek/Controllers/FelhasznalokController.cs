using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ugyfelek.Database;
using ugyfelek.Models;
using ugyfelnyilvantartas.Password;

namespace ugyfelek.Controllers
{
    public class UsersResponseModel
    {
        public int FelhasznaloId { get; set; }
        public string Nev { get; set; }
        public string Telszam { get; set; }
        public string Email { get; set; }

        public string Szerepkor { get; set; }
        public int CegId { get; set; }
        public Cegek Cegek { get; set; }
        public UsersResponseModel(Felhasznalok Felh)
        {
            FelhasznaloId = Felh.FelhasznaloId;
            Nev = Felh.Nev;
            Email = Felh.Email;
            Szerepkor = Felh.Szerepkor;
            Telszam = Felh.Telszam;
            CegId = Felh.CegId;
        }
    }
    public class UserCompanyModel
    {
        public string Nev { get; set; }
        public string Email { get; set; }
        public string Passwd { get; set; }
        public string Szerepkor { get; set; }
        public string Telszam { get; set; }
        public string CegEmail { get; set; }
        public string CegNev { get; set; }
        public string CegTelszam { get; set; }
        public int? Iranyitoszam { get; set; }
        public string Varos { get; set; }
        public string Utca { get; set; }
        public string Hazszam { get; set; }
        public int Cegforma { get; set; }
    }
    public class UsersRequestModel
    {
        public UsersRequestModel() { }
        public UsersRequestModel(Felhasznalok F)
        {
            Nev = F.Nev;
            Email = F.Email;
            Passwd = Passwd;
            Szerepkor = F.Szerepkor;
            Telszam = F.Telszam;
            CegId = F.CegId;
        }

        public string Nev { get; set; }
        public string Email { get; set; }
        public string Passwd { get; set; }
        public string Szerepkor { get; set; }
        public string Telszam { get; set; }
        public int CegId { get; set; }
    }
    public class UsersUpdateModel {
        public string Nev { get; set; }
        public string Email { get; set; }
        public string OldPasswd { get; set; }
        public string NewPasswd { get; set; }
        public string Szerepkor { get; set; }
        public string Telszam { get; set; }
        public int CegId { get; set; }
    }
    public class AuthenticationModel
    {
        public string Email { get; set; }
        public string Passwd { get; set; }

    }
    public class UsersPatchModel
    {
        public string Nev { get; set; }
        public string Telszam { get; set; }
        public string Passwd { get; set; }
    }
    public class ChangePasswordModel
    {
        public string Email { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }

    }

    public class FelhasznalokController : ApiController
    {
        private INyilvanContext ctx = new NyilvanContext();
        public FelhasznalokController() { }
        public FelhasznalokController(INyilvanContext context)
        {
            ctx = context;


        }
        // GET api/<controller>
        [ResponseType(typeof(UsersResponseModel))]
        public IHttpActionResult Get()
        {
                try
                {
               
                    var res = ctx.Felhasznalok.Include(x => x.Cegek).ToList();
                    List<UsersResponseModel> response = new List<UsersResponseModel>();
                    foreach (var item in res)
                    {
                        response.Add(new UsersResponseModel(item));
                    }

                    return Ok(response);
                }

                catch (Exception e)
                {

                    return InternalServerError(e);
                    
                }
            
        }


        // GET api/<controller>/5
        [ResponseType(typeof(UsersResponseModel))]
        public IHttpActionResult Get(int id)
        {
           

                try
                {
                    var res = ctx.Felhasznalok.Where(x => x.FelhasznaloId == id).FirstOrDefault();

                    if (res == null)
                        return NotFound();

                    var response = new UsersResponseModel(res);
                    return Ok(response);

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                    
                }

            
        }
        [HttpPost]
        [Route("api/Felhasznalok/register")]
        [ResponseType(typeof(UserCompanyModel))]
        public IHttpActionResult Register([FromBody] UserCompanyModel value)
        {
            
                try
                {
                    PasswordManager.CreatePasswordHash(value.Passwd, out byte[] hash, out byte[] salt);
                    var email = ctx.Felhasznalok.Where(x => x.Email == value.Email).FirstOrDefault();
                    if (email != null)
                    {
                        return Conflict();
                        
                    }
                    var cegemail = ctx.Cegek.Where(x => x.Email == value.CegEmail).FirstOrDefault();
                    if (cegemail != null)
                    {
                        return Conflict();
                    }





                    var cim = ctx.Cimek.Where(x => x.Irsz == value.Iranyitoszam && x.Hazszam == value.Hazszam && x.Utca == value.Utca).FirstOrDefault();
                    if (cim == null)
                    {
                        var cimres = ctx.Cimek.Add(new Cimek { Irsz = value.Iranyitoszam, Hazszam = value.Hazszam, TelepulesNev = value.Varos, Utca = value.Utca });
                        ctx.SaveChanges();
                    }
                    int cimid = ctx.Cimek.Where(x => x.Irsz == value.Iranyitoszam && x.Hazszam == value.Hazszam && x.Utca == value.Utca).FirstOrDefault().CimId;

                    var res2 = ctx.Cegek.Add(new Cegek
                    {
                        Nev = value.CegNev,
                        Email = value.CegEmail,
                        Telszam = value.Telszam,
                        FormaId = value.Cegforma,
                        CimId = cimid
                    });
                    var res1 = ctx.Felhasznalok.Add(new Felhasznalok
                    {
                        Nev = value.Nev,
                        Email = value.Email,
                        PasswdHash = hash,
                        PasswdSalt = salt,
                        Szerepkor = value.Szerepkor,
                        Telszam = value.Telszam
                    });
                    ctx.SaveChanges();
                    var response = new UserCompanyModel { CegEmail = res2.Email, CegNev = res2.Nev, CegTelszam = res2.Telszam, Cegforma = res2.FormaId, Iranyitoszam = res2.Cim.Irsz, Email = res1.Email, Hazszam = res2.Cim.Hazszam, Nev = res1.Nev, Szerepkor = res1.Szerepkor, Telszam = res1.Telszam, Utca = res2.Cim.Utca, Varos = res2.Cim.TelepulesNev, Passwd = value.Passwd };
                    return Ok(response);
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            
        }

        // POST api/<controller>
        [ResponseType(typeof(UsersResponseModel))]
        public IHttpActionResult Post([FromBody] UsersRequestModel value)
        {
            
                try
                {
                    PasswordManager.CreatePasswordHash(value.Passwd, out byte[] hash, out byte[] salt);

                    var email = ctx.Felhasznalok.Where(x => x.Email == value.Email).FirstOrDefault();
                    if (email != null)
                    {
                        return Conflict();
                    }

                    var res = ctx.Felhasznalok.Add(new Felhasznalok
                    {
                        Nev = value.Nev,
                        Email = value.Email,
                        PasswdHash = hash,
                        PasswdSalt = salt,
                        Szerepkor = value.Szerepkor,
                        Telszam = value.Telszam,
                        CegId = value.CegId


                    }); ;

                    ctx.SaveChanges();

                    return StatusCode(HttpStatusCode.Created);
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex); 
                }
            
        }

        // PUT api/<controller>/5
        [ResponseType(typeof(UsersResponseModel))]
        public IHttpActionResult Put(int id, [FromBody] UsersUpdateModel value)
        {
            
                try
                {
                    var result = ctx.Felhasznalok.Where(x => x.FelhasznaloId == id).FirstOrDefault();
                    if (result == null)
                    {
                        return NotFound();
                    }
                    var valid = PasswordManager.VerifyPasswordHash(value.OldPasswd, result.PasswdHash, result.PasswdSalt);
                    if (!valid)
                    {
                        return Unauthorized();
                    }
                    result.Nev = value.Nev;
                    PasswordManager.CreatePasswordHash(value.NewPasswd, out byte[] hash, out byte[] salt);
                    result.PasswdHash = hash;
                    result.PasswdSalt = salt;
                    result.Telszam = value.Telszam;

                    var response = new UsersResponseModel(result);
                    ctx.SaveChanges();
                    return Ok(response);
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }

            
        }

        //PATCH api/<controller>/5
        public IHttpActionResult Patch(int id, [FromBody] UsersPatchModel value)
        {

            try
            {
                var result = ctx.Felhasznalok.Where(x => x.FelhasznaloId == id).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }
                var valid = PasswordManager.VerifyPasswordHash(value.Passwd, result.PasswdHash, result.PasswdSalt);
                if (!valid)
                {
                    return Unauthorized();
                }
                if (value.Nev!= null)
                {
                    result.Nev = value.Nev;
                }
                if (value.Telszam != null)
                {
                    result.Telszam = value.Telszam;
                }

                var response = new UsersResponseModel(result);
                ctx.SaveChanges();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }


        }

        // DELETE api/<controller>/5
        public IHttpActionResult Delete(int id)
        {
           
                try
                {
                    var result = ctx.Felhasznalok.Where(x => x.FelhasznaloId == id).FirstOrDefault();
                    
                    if (result != null)
                    {
                    var feladatok = ctx.FelhasznaloFeladat.Where(x => x.felhasznaloId == id).ToList();
                    foreach (var item in feladatok)
                    {
                        ctx.FelhasznaloFeladat.Remove(item);
                    }
                        ctx.Felhasznalok.Remove(result);
                        ctx.SaveChanges();
                        var response = new UsersResponseModel(result);
                        return Ok(response);
                    }
                    return NotFound();

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
      
            
        }


        [HttpPost]
        [Route("api/Felhasznalok/authenticate")]
        [ResponseType(typeof(UsersResponseModel))]

        public IHttpActionResult Authenticate([FromBody] AuthenticationModel value)
        {
            using (var ctx = new NyilvanContext())
            {
                var res = ctx.Felhasznalok.Where(x => x.Email == value.Email).FirstOrDefault();
                if (res != null)
                {
                    var valid = PasswordManager.VerifyPasswordHash(value.Passwd, res.PasswdHash, res.PasswdSalt);
                    var response = new UsersResponseModel(res);
                    if (valid)
                    {
                        return Ok(response);
                    }
                    else
                    {
                        return Unauthorized();
                    }

                }
                return NotFound();
            }
        }
        [HttpPatch]
        [Route("api/Felhasznalok/changepassword")]
        [ResponseType(typeof(UsersResponseModel))]
        public IHttpActionResult ChangePassword([FromBody] ChangePasswordModel value)
        {
            var res = ctx.Felhasznalok.Where(x => value.Email == x.Email).FirstOrDefault();
            if (res==null)
            {
                return NotFound();
            }
            var valid = PasswordManager.VerifyPasswordHash(value.OldPassword, res.PasswdHash, res.PasswdSalt);
            if (valid)
            {
                PasswordManager.CreatePasswordHash(value.NewPassword, out byte[] hash, out byte[] salt);
                res.PasswdHash = hash;
                res.PasswdSalt = salt;
                ctx.SaveChanges();
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }
        [HttpGet]
        [Route("api/Felhasznalok/check-email")]
        public IHttpActionResult CheckEmail([FromUri] string email)
        {
            using (var ctx = new NyilvanContext())
            {
                if (string.IsNullOrEmpty(email))
                {
                    return BadRequest("Az email nem lehet üres.");
                    
                }

                var emailExists = ctx.Felhasznalok.Any(x => x.Email == email);

                if (emailExists)
                {
                    return Conflict();
                }

                return Ok();
            }
        }
        [Route("api/Felhasznalok/GetUgyfelek")]
        [ResponseType(typeof(UsersResponseModel))]
        public IHttpActionResult GetUgyfelek(int id)
        {
            using (var ctx = new NyilvanContext())
            {

                try
                {

                    var fh = ctx.Felhasznalok.Where(x => id == x.FelhasznaloId).FirstOrDefault();
                    if (fh == null)
                        return NotFound();
                    var res = ctx.Felhasznalok.Where(x => x.CegId == fh.CegId && x.Szerepkor == "ügyfél").ToList();
                    return Ok(res);

                }
                catch (Exception e)
                {
                    return InternalServerError(e);

                }

            }
        }
        [Route("api/Felhasznalok/GetAlkalmazottak")]
        [ResponseType(typeof(UsersResponseModel))]
        public HttpResponseMessage GetAlkalmazottak(int id)
        {
            using (var ctx = new NyilvanContext())
            {

                try
                {

                    var fh = ctx.Felhasznalok.Where(x => id == x.FelhasznaloId).FirstOrDefault();
                    if (fh == null)
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    var res = ctx.Felhasznalok.Where(x => x.CegId == fh.CegId && x.Szerepkor == "alkalmazott").ToList();
                    return Request.CreateResponse(HttpStatusCode.OK, res);

                }
                catch (Exception e)
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, e);

                }

            }
        }
        [HttpPost]
        [Route("api/Felhasznalok/PostUgyfel")]
        public HttpResponseMessage PostUgyfel([FromBody] UsersRequestModel value)
        {
            using (var ctx = new NyilvanContext())
            {
                try
                {
                    PasswordManager.CreatePasswordHash(value.Passwd, out byte[] hash, out byte[] salt);

                    var email = ctx.Felhasznalok.Where(x => x.Email == value.Email && x.CegId == value.CegId).FirstOrDefault();
                    if (email != null)
                    {
                        return Request.CreateResponse(HttpStatusCode.Conflict, "EMAIL_EXISTS");
                    }

                    var res = ctx.Felhasznalok.Add(new Felhasznalok
                    {
                        Nev = value.Nev,
                        Email = value.Email,
                        PasswdHash = hash,
                        PasswdSalt = salt,
                        Szerepkor = "ügyfél",
                        Telszam = value.Telszam,
                        CegId = value.CegId


                    }); ;

                    ctx.SaveChanges();

                    return Request.CreateResponse(HttpStatusCode.Created, res);
                }
                catch (Exception ex)
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                }
            }
        }
        [HttpPut]
        [Route("api/Felhasznalok/PutUgyfelAlkalmazott")]
        public IHttpActionResult PutUgyfelAlkalmazott(int id, [FromBody] UsersUpdateModel value)
        {

            try
            {
                var result = ctx.Felhasznalok.Where(x => x.FelhasznaloId == id).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }
                result.Nev = value.Nev;
                result.Telszam = value.Telszam;

                var response = new UsersResponseModel(result);
                ctx.SaveChanges();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }


        }

    }
}