using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ugyfelek.Database;
using ugyfelek.Models;

namespace ugyfelek.Controllers
{
    
    public class SzinekController : ApiController
    {
       

        private INyilvanContext ctx = new NyilvanContext();
        public SzinekController() { }
        public SzinekController(INyilvanContext context)
        {
            ctx = context;


        }

        // GET api/<controller>
        [ResponseType(typeof(Szinek))]
        public IHttpActionResult Get()
        {
            var result = ctx.Szinek.ToList();

            return Ok(result);
        }

        // GET api/<controller>/5
        [ResponseType(typeof(Szinek))]
        public IHttpActionResult Get(string id)
        {
            
                var result = ctx.Szinek.Where(x => x.SzinId == id).FirstOrDefault();
                if (result != null)
                {
                    return Ok(result);
                }
                return NotFound();
            
        }

        // POST api/<controller>

        [ResponseType(typeof(Szinek))]
        public IHttpActionResult Post([FromBody] Szinek value)
        {

            

                try
                {
                    var res = (new Szinek
                    {
                        SzinId = value.szinNev,
                        szinNev = value.szinNev



                    }) ;
                    ctx.Szinek.Add(res);
                    ctx.SaveChanges();

                return Content(HttpStatusCode.Created, res);
                }

                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            


        }

        // PUT api/<controller>/5
      

        // DELETE api/<controller>/5

    }
}