using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ugyfelek.Database;
using ugyfelek.Models;

namespace ugyfelek.Controllers
{
    public class CegekController : ApiController
    {
        private INyilvanContext ctx = new NyilvanContext();
        public CegekController() { }
        public CegekController(INyilvanContext context)
        {
            ctx = context;


        }

        public class CegekModel
        {
            public string Telszam { get; set; }
            public string Email { get; set; }
            public string Nev { get; set; }
            public string Formanev { get; set; }
            public string TelepulesNev { get; set; }
            public int? Irsz { get; set; }
            public string Utca { get; set; }
            public string Hazszam { get; set; }
            public int FormaId { get; set; }
            public int CimId { get; set; }

            public CegekModel() { }


            public CegekModel(Cegek C)
            {
                Telszam = C.Telszam;
                Email = C.Email;
                Nev = C.Nev;
                FormaId = C.FormaId;
                CimId = C.CimId;
                Formanev = C.Forma.Nev;
                TelepulesNev = C.Cim.TelepulesNev;
                Irsz = C.Cim.Irsz;
                Utca = C.Cim.Utca;
                Hazszam = C.Cim.Hazszam;

            }
        }
        public class CegekUpdateModel
        {
            public CegekUpdateModel(Cegek C)
            {
                Telszam = C.Telszam;
                Email = C.Email;
                Nev = C.Nev;
                FormaId = C.FormaId;
                Cimek = C.Cim;
            }
            public CegekUpdateModel()
            {

            }

            public string Telszam { get; set; }
            public string Email { get; set; }
            public string Nev { get; set; }
            public int FormaId { get; set; }
            public Cimek Cimek { get; set; }
        }
        // GET api/<controller>
        public IHttpActionResult Get()
        {

            try
            {
                var res = ctx.Cegek.Include(x => x.Forma).Include(x => x.Cim).ToList();

                return Ok(res);
            }
            catch (Exception e)
            {
                return InternalServerError(e);

            }


        }

        // GET api/<controller>/5
        public IHttpActionResult Get(int id)
        {

            try
            {

                var result = ctx.Cegek.Where(x => x.CegId == id).Include(x => x.Forma).Include(x => x.Cim).FirstOrDefault();
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
        public IHttpActionResult Post([FromBody] CegekModel value)
        {



            try
            {
                var res = (new Cegek
                {

                    Telszam = value.Telszam,
                    Email = value.Email,
                    Nev = value.Nev,
                    FormaId = value.FormaId,
                    CimId = value.CimId



                });
                ctx.Cegek.Add(res);
                ctx.SaveChanges();
                return StatusCode(HttpStatusCode.Created);
            }

            catch (Exception e)
            {
                return InternalServerError(e);
            }

        }

        // PUT api/<controller>/5
        public IHttpActionResult Put(int id, [FromBody] CegekUpdateModel value)
        {

            try
            {

                var result = ctx.Cegek.Where(x => x.CegId == id).Include(x => x.Forma).Include(x => x.Cim).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }
                if (value.Email != null)
                {
                    result.Email = value.Email;
                }
                if (value.Telszam != null)
                {
                    result.Telszam = value.Telszam;
                }
                if (value.Nev != null)
                {
                    result.Nev = value.Nev;
                }
                result.FormaId = value.FormaId;
                if (value.Cimek.TelepulesNev != null)
                {
                    result.Cim.TelepulesNev = value.Cimek.TelepulesNev;
                }
                if (value.Cimek.Hazszam != null)
                {
                    result.Cim.Hazszam = value.Cimek.Hazszam;
                }
                if (value.Cimek.Utca != null)
                {
                    result.Cim.Utca = value.Cimek.Utca;
                }
                if (value.Cimek.Irsz != null)
                {
                    result.Cim.Irsz = value.Cimek.Irsz;
                }


                var response = new Cegek(result.CegId, result.Telszam, result.Email, result.Nev, result.FormaId, result.Cim.TelepulesNev, result.Cim.Irsz, result.Cim.Utca, result.Cim.Hazszam);
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

            var result = ctx.Cegek.Where(x => x.CegId == id).Include(x => x.Cim).Include(x => x.Forma).FirstOrDefault();
            if (result != null)
            {
                ctx.Cegek.Remove(result);
                ctx.SaveChanges();

                return Ok(result);
            }
            return NotFound();
        }

    }
}