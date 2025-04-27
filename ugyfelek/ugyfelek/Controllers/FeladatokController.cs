using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Razor.Parser;
using ugyfelek.Database;
using ugyfelek.Models;
using static ugyfelek.Controllers.FelhasznaloFeladatController;

namespace ugyfelek.Controllers
{

    public class FeladatokController : ApiController
    {
        private INyilvanContext ctx = new NyilvanContext();
        public FeladatokController() { }
        public FeladatokController(INyilvanContext context)
        {
            ctx = context;


        }

        public class FeladatokModel
        {

            public string Nev { get; set; }
            public string Leiras { get; set; }
            public string ismGyak { get; set; }
            public bool Allapot { get; set; }
            public string szinId { get; set; }

            public int Ember { get; set; }
            public int Csoport { get; set; }

            public DateTime Hatarido { get; set; }

            public FeladatokModel() { }

            public FeladatokModel(Feladatok F)
            {
                Csoport = F.Csoport;
                Nev = F.Nev;
                Leiras = F.Leiras;
                ismGyak = F.ismGyak;
                Allapot = F.Allapot;
                szinId = F.szinId;

            }

        }



        // GET api/<controller>
        [ResponseType(typeof(Feladatok))]
        public IHttpActionResult Get()
        {


            try
            {
                var res = ctx.Feladatok.Include(x => x.Szinek).ToList();

                return Ok(res);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }


        }

        // GET api/<controller>/5
        [ResponseType(typeof(Feladatok))]
        public IHttpActionResult Get(int id)
        {


            try
            {

                var result = ctx.Feladatok.Where(x => x.FeladatId == id).FirstOrDefault();
                if (result != null)
                {
                    return Ok(result);
                }
                return NotFound();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

        }

        // POST api/<controller>

        [ResponseType(typeof(Feladatok))]
        public IHttpActionResult Post([FromBody] FeladatokModel value)
        {

            try
            {
                if (value.Csoport == 0)
                {
                    value.Csoport = ctx.Feladatok.Select(x => x.Csoport).Distinct().Count() + 2; ;
                }


                var res = (new Feladatok
                {

                    Nev = value.Nev,
                    Leiras = value.Leiras,
                    ismGyak = value.ismGyak,
                    Allapot = value.Allapot,
                    szinId = value.szinId,
                    Hatarido = value.Hatarido,
                    Csoport = value.Csoport



                });
                ctx.Feladatok.Add(res);
                ctx.SaveChanges();
                return Content(HttpStatusCode.Created, res);
            }

            catch (Exception e)
            {

                return InternalServerError(e);
            }




        }

        // PUT api/<controller>/5
        [ResponseType(typeof(Feladatok))]
        public IHttpActionResult Put(int id, [FromBody] FeladatokModel value)
        {

            try
            {

                var result = ctx.Feladatok.Where(x => x.FeladatId == id).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }

                if (value.Nev != null)
                {
                    result.Nev = value.Nev;
                }

                if (value.Leiras != null)
                {
                    result.Leiras = value.Leiras;
                }

                if (value.Hatarido != null)
                {
                    result.Hatarido = value.Hatarido;
                }

                if (value.ismGyak != null)
                {
                    result.ismGyak = value.ismGyak;
                }


                if (value.szinId != null)
                {
                    result.szinId = value.szinId;
                }

                if (value.Allapot != null)
                {
                    result.Allapot = value.Allapot;
                }

                var response = new FeladatokModel(result);
                if (value.szinId == null)
                {
                    response.szinId = result.szinId;
                }
                ctx.SaveChanges();
                return Ok(response);
            }


            catch (Exception e)
            {
                return InternalServerError(e);

            }


        }




        // DELETE api/<controller>/5
        public IHttpActionResult Delete(int id)
        {

            var result = ctx.Feladatok.Where(x => x.FeladatId == id).FirstOrDefault();
            if (result != null)
            {
                var feladat = ctx.FelhasznaloFeladat.Where(x => x.feladatId == id).ToList();
                if (feladat != null)
                {
                    foreach (var item in feladat)
                    {
                        ctx.FelhasznaloFeladat.Remove(item);

                    }
                }
                ctx.Feladatok.Remove(result);
                ctx.SaveChanges();

                return Ok(result);
            }
            return NotFound();

        }
        [Route("api/Feladatok/Repeat")]
        public IHttpActionResult Repeat()
        {
            var FFcontroller = new FelhasznaloFeladatController(ctx);
            var now = DateTime.Now;

            var feladatok = ctx.Feladatok.Include(x => x.Szinek)
                .Where(x => x.Hatarido <= now && x.Allapot == true && x.ismGyak != null)
                .ToList();

            foreach (var item in feladatok)
            {
                // Megnézzük, van-e nem teljesített feladat ugyanabban a csoportban
                var csoportosFeladatok = ctx.Feladatok
                    .Where(x => x.Csoport == item.Csoport)
                    .ToList();

                var vanNemTeljesitett = csoportosFeladatok.Any(x => !x.Allapot);
                if (vanNemTeljesitett) continue;

                // Az utolsó (legnagyobb) határidőt keressük a csoportban
                var utolsoHatarido = csoportosFeladatok.Max(x => x.Hatarido);

                // Napok meghatározása gyakoriság alapján
                var napok = GetIsmetlodesNapok(item.ismGyak);
                if (napok == 0) continue;

                // Új határidő számítása
                var ujHatarido = utolsoHatarido.AddDays(napok);

                // Kapcsolódó felhasználók lekérése
                var kapcsolatok = ctx.FelhasznaloFeladat
                    .Where(x => x.feladatId == item.FeladatId)
                    .ToList();

                // Új feladat létrehozása
                var ujFeladat = new FeladatokModel
                {
                    Nev = item.Nev,
                    Allapot = false,
                    Hatarido = ujHatarido,
                    ismGyak = item.ismGyak,
                    Leiras = item.Leiras,
                    szinId = item.szinId,
                    Csoport = item.Csoport
                };

                // Létrehozzuk a feladatot, mentjük, lekérjük az új ID-t
                Post(ujFeladat);
                ctx.SaveChanges();
                var ujFeladatEntity = ctx.Feladatok.OrderByDescending(x => x.FeladatId).First();

                // Hozzárendeljük az összes korábbi kapcsolódó felhasználót
                foreach (var kapcs in kapcsolatok)
                {
                    FFcontroller.Post(new FelhFeladatModel
                    {
                        feladatId = ujFeladatEntity.FeladatId,
                        felhasznaloId = kapcs.felhasznaloId
                    });
                }
            }

            ctx.SaveChanges();
            return Ok("Feladatok ismétlése megtörtént");
        }

        private int GetIsmetlodesNapok(string ismGyak)
        {
            switch (ismGyak)
            {
                case "Heti": return 7;
                case "Havi": return 30;
                case "Negyedéves": return 90;
                case "Féléves": return 180;
                case "Éves": return 365;
                default: return 0;
            }
        }




        [Route("api/Feladatok/PutAll")]
        [ResponseType(typeof(Feladatok))]
        [HttpPut]
        public IHttpActionResult PutAll(int id, [FromBody] FeladatokModel value)
        {

            try
            {

                var Feladat = ctx.Feladatok.Where(x => x.FeladatId == id).FirstOrDefault();
                var AllFeladat = ctx.Feladatok.Where(x => x.Csoport == Feladat.Csoport).ToList();

                foreach (var f in AllFeladat)
                {
                    var r = f;
                    if (f == null)
                    {
                        return NotFound();
                    }

                    if (value.Nev != null)
                    {
                        r.Nev = value.Nev;
                    }

                    if (value.Leiras != null)
                    {
                        r.Leiras = value.Leiras;
                    }

                  

                    if (value.ismGyak != null)
                    {
                        r.ismGyak = value.ismGyak;
                    }


                    if (value.szinId != null)
                    {
                        r.szinId = value.szinId;
                    }

                    ctx.SaveChanges();

                }
                return Ok();
            }
            catch (Exception e)
            {
                return InternalServerError(e);

            }



        }

        [Route("api/Feladatok/DeleteAll")]
        public IHttpActionResult DeleteAll(int id)
        {

            var Feladat = ctx.Feladatok.Where(x => x.FeladatId == id).FirstOrDefault();
            var AllFeladat = ctx.Feladatok.Where(x => x.Csoport == Feladat.Csoport).ToList();
            if (Feladat != null)
            {
                foreach (var f in AllFeladat)
                {
                    var feladat = ctx.FelhasznaloFeladat.Include(x =>x.Feladatok).Where(x => x.feladatId == f.FeladatId).ToList();
                    if (feladat != null)
                    {
                        foreach (var item in feladat)
                        {
                            ctx.FelhasznaloFeladat.Remove(item);

                        }
                        ctx.Feladatok.Remove(f);
                        ctx.SaveChanges();
                    }
                    
                }


                return Ok();
            }
            return NotFound();

        }


    }
}