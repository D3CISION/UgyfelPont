using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ugyfelek.Models;
using ugyfelek.Database;
using System.Web.Http.Description;

namespace ugyfelek.Controllers
{
    public class CimekController : ApiController
    {
        private INyilvanContext ctx = new NyilvanContext();
        public CimekController() { }
        public CimekController(INyilvanContext context)
        {
            ctx = context;


        }
        public class CimModel
        {
            public CimModel(Cimek C)
            {
                Hazszam = C.Hazszam;
                Utca = C.Utca;
                TelepulesNev = C.TelepulesNev;
                Irsz = C.Irsz;
            }

            public string Hazszam { get; set; }
            public string Utca { get; set; }
            public string TelepulesNev { get; set; }
            public int? Irsz { get; set; }
        }
        // GET api/<controller>
        public IHttpActionResult Get()
        {

           
                try
                {
                    var res = ctx.Cimek.ToList();


                    return Ok(res);
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }

            
        }

        // GET api/<controller>/5
        [ResponseType(typeof(Cimek))]
        public IHttpActionResult Get(int id)
        {

            
                try
                {

                    var result = ctx.Cimek.Where(x => x.CimId == id).FirstOrDefault();
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

        [ResponseType(typeof(Cimek))]
        public IHttpActionResult Post([FromBody] CimModel value)
        {

                try
                {
                    var res = (new Cimek
                    {

                        
                        Hazszam=value.Hazszam, 
                        Utca=value.Utca,
                        TelepulesNev=value.TelepulesNev,
                        Irsz=value.Irsz

                    });
                    ctx.Cimek.Add(res);
                    ctx.SaveChanges();
                    return StatusCode(HttpStatusCode.Created);
                }

                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            


        }

        // PUT api/<controller>/5
        [ResponseType(typeof(Cimek))]
        public IHttpActionResult Put(int id, [FromBody] CimModel value)
        {
            
                try
                {

                    var result = ctx.Cimek.Where(x => x.CimId == id).FirstOrDefault();
                    if (result == null)
                    {
                        return NotFound();
                    }

                    if (value.Hazszam != null)
                    {
                        result.Hazszam = value.Hazszam;
                    }

                    if (value.Irsz != null)
                    {
                        result.Irsz = value.Irsz;
                    }

                    if (value.Utca != null)
                    {
                        result.Utca = value.Utca;
                    }

                    if (value.TelepulesNev != null)
                    {
                        result.TelepulesNev = value.TelepulesNev;
                    }

                    var response = new CimModel(result);
                    
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
           
                var result = ctx.Cimek.Where(x => x.CimId == id).FirstOrDefault();
                if (result != null)
                {
                    ctx.Cimek.Remove(result);
                    ctx.SaveChanges();

                    return Ok(result);
                }
                return NotFound();
            
        }
    }
}