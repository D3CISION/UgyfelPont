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

namespace ugyfelek.Controllers
{
    public class FelhasznaloFeladatController : ApiController
    {
        public class FeladatFelhasznaloResponseModel
        {
            public Feladatok Feladat { get; set; }
            public Felhasznalok Felhasznalok { get; set; }

            public FeladatFelhasznaloResponseModel(FelhasznaloFeladat felhasznaloFeladat)
            {
                Feladat = felhasznaloFeladat.Feladatok;
                Felhasznalok = felhasznaloFeladat.Felhasznalok;
            }


        }
        public class FelhasznaloResponseModel
        {
         
            public string Nev { get; set; }
            public string Email { get; set; }
            public string Szerepkor { get; set; }

            public FelhasznaloResponseModel(FelhasznaloFeladat felhasznaloFeladat)
            {
                
                Nev = felhasznaloFeladat.Felhasznalok.Nev;
                Email = felhasznaloFeladat.Felhasznalok.Email;
                Szerepkor = felhasznaloFeladat.Felhasznalok.Szerepkor;
            }

           
        }
        public class FeladatResponseModel
        {
            public Feladatok Feladat { get; set; }

            public FeladatResponseModel(FelhasznaloFeladat felhasznaloFeladat)
            {
                Feladat = felhasznaloFeladat.Feladatok;
            }


        }

        public class FelhFeladatModel
        {
           
            public int felhasznaloId { get; set; }
            public int feladatId { get; set; }
        }

        private INyilvanContext ctx = new NyilvanContext();
        public FelhasznaloFeladatController() { }
        public FelhasznaloFeladatController(INyilvanContext context)
        {
            ctx = context;


        }

        // GET api/<controller>
        [ResponseType(typeof(FelhasznaloFeladat))]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(ctx.FelhasznaloFeladat.ToList());
            }
            catch (Exception e)
            {
                return InternalServerError(e);
              
            }
           
        }

        // GET api/<controller>/5
        public IHttpActionResult Get(int id)
        {
            var res = ctx.FelhasznaloFeladat.Include(x => x.Feladatok).Include(x => x.Felhasznalok).Where(x => id == x.felhasznaloId).FirstOrDefault();
            if (res!=null)
            {
                return Ok(res);
            }
            return NotFound();

        }

        // POST api/<controller>
        public IHttpActionResult Post([FromBody] FelhFeladatModel value)
        {
            try
            {
                var res = (new FelhasznaloFeladat
                {
                   
                    felhasznaloId=value.felhasznaloId,
                    feladatId=value.feladatId



                });
                ctx.FelhasznaloFeladat.Add(res);
                ctx.SaveChanges();
                return StatusCode(HttpStatusCode.Created);
            }

            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

       

        // DELETE api/<controller>/5
        public IHttpActionResult Delete(int id)
        {

            var result = ctx.FelhasznaloFeladat.Where(x => x.felkapcsId == id).FirstOrDefault();
            if (result != null)
            {
                ctx.FelhasznaloFeladat.Remove(result);
                ctx.SaveChanges();

                return Ok(result);
            }
            return NotFound();
        }

        [Route("api/FelhasznaloFeladat/FelhFromFeladat")]
        
        public IHttpActionResult GetFelhFromFeladat(int id)
        {
            var res = ctx.FelhasznaloFeladat.Include(x => x.Feladatok).Include(x => x.Felhasznalok).Where(x => x.feladatId == id).ToList();
            List<FelhasznaloResponseModel> response = new List<FelhasznaloResponseModel>();
            foreach (var item in res)
            {
                response.Add(new FelhasznaloResponseModel(item));
            }

            if (res!=null)
            {
                return Ok(response);
            }
            return NotFound();

        }
        [Route("api/FelhasznaloFeladat/GetUgyfelekWithFeladat")]
        public IHttpActionResult GetUgyfelekWithFeladat(int id)
        {
            
            var res = ctx.FelhasznaloFeladat.Include(x => x.Feladatok).Include(x => x.Felhasznalok).Where(x => x.felhasznaloId == id).ToList();
            var nemFelhasznalo = ctx.FelhasznaloFeladat.Include(x => x.Feladatok).Include(x => x.Felhasznalok).Where(x => x.felhasznaloId!= id).ToList();
            List<FeladatFelhasznaloResponseModel> response = new List<FeladatFelhasznaloResponseModel>();
            bool vanUgyfel = false;
            foreach (var item in res)
            {
                vanUgyfel = false;
                foreach (var elem in nemFelhasznalo)
                {
                    if (elem.feladatId==item.feladatId )
                    {
                        response.Add(new FeladatFelhasznaloResponseModel(elem));
                        vanUgyfel = true;
                    }
                }
                if (!vanUgyfel)
                {
                    response.Add(new FeladatFelhasznaloResponseModel(item));
                }
            }

            if (res != null)
            {
                return Ok(response);
            }
            return NotFound();

        }
        [Route("api/FelhasznaloFeladat/FeladatForFelhasznalo")]
        public IHttpActionResult GetFeladatForFelhasznalo(int id)
        {
            var res = ctx.FelhasznaloFeladat.Include(x => x.Feladatok).Include(x => x.Felhasznalok).Where(x => x.Felhasznalok.FelhasznaloId == id   ).ToList();
            List<FeladatResponseModel> response = new List<FeladatResponseModel>();
            foreach (var item in res)
            {
                response.Add(new FeladatResponseModel(item));
            }

            if (res != null)
            {
                return Ok(response);
            }
            return NotFound();

        }
        [Route("api/FelhasznaloFeladat/GetUgyfelek")]
        public IHttpActionResult GetUgyfelek(int cegId)
        {
            using (var ctx = new NyilvanContext())
            {

                try
                {
                    var res = ctx.FelhasznaloFeladat.Include(x => x.Feladatok).Include(x => x.Felhasznalok).Where(x => x.Felhasznalok.CegId == cegId).ToList();
                    List<FeladatFelhasznaloResponseModel> response = new List<FeladatFelhasznaloResponseModel>();
                    foreach (var item in res)
                    {
                        response.Add(new FeladatFelhasznaloResponseModel(item));
                    }

                    if (res == null)
                        return NotFound();



                    return Ok(response);

                }
                catch (Exception e)
                {
                    return InternalServerError(e);

                }

            }
        }
        [HttpPost]
        [Route("api/FelhasznaloFeladat/PostFeladatWithFelhasznalo")]
        public IHttpActionResult PostFeladatWithFelhasznalo([FromBody] FeladatokController.FeladatokModel feladat, int id)
        {
            try
            {

                if (feladat.Csoport == 0)
                {
                    feladat.Csoport = ctx.Feladatok.Select(x => x.Csoport).Distinct().Count() + 2; ;
                }


                var newFeladat = new Feladatok
                {
                    Nev = feladat.Nev,
                    Leiras = feladat.Leiras,
                    ismGyak = feladat.ismGyak,
                    Allapot = feladat.Allapot,
                    szinId = feladat.szinId,
                    Hatarido = feladat.Hatarido,
                    Csoport = feladat.Csoport
                };

                ctx.Feladatok.Add(newFeladat);

                ctx.SaveChanges();


                if (feladat.Ember!=0)
                {
                    var res1 = new FelhasznaloFeladat
                    {

                        felhasznaloId = feladat.Ember,
                        feladatId = newFeladat.FeladatId


                    };
                    ctx.FelhasznaloFeladat.Add(res1);
                }

                var res = (new FelhasznaloFeladat
                {

                    felhasznaloId = id,
                    feladatId = newFeladat.FeladatId


                });
               
                ctx.FelhasznaloFeladat.Add(res);
                ctx.SaveChanges();
                return StatusCode(HttpStatusCode.Created);
            }

            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }
    }
}