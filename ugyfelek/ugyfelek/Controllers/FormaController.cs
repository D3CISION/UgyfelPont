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
    public class FormaController : ApiController
    {
        private INyilvanContext ctx = new NyilvanContext();
        public FormaController() { }
        public FormaController(INyilvanContext context)
        {
            ctx = context;


        }
        
        public class FormaModel
        {
            public FormaModel() { }
            public FormaModel(Formak F)
            {
                FormaId = F.FormaId;
                Nev = F.Nev;
                Rovidites = F.Rovidites;
            }

            public int FormaId { get; set; }
            public string Nev { get; set; }
            public string Rovidites { get; set; }
        }
        // GET api/<controller>
        public IHttpActionResult Get()
        {

            
                try
                {
                    var res = ctx.Formak.ToList();

                    return Ok(res);
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }

            
        }

        // GET api/<controller>/5
        [ResponseType(typeof(Formak))]
        public IHttpActionResult Get(int id)
        {

           
                try
                {

                    var result = ctx.Formak.Where(x => x.FormaId == id).FirstOrDefault();
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

        [ResponseType(typeof(Formak))]
        public IHttpActionResult Post([FromBody] Formak value)
        {

           

                try
                {
                    var res = (new Formak
                    {


                        FormaId=value.FormaId,
                        Nev=value.Nev




                    });
                    ctx.Formak.Add(res);
                    ctx.SaveChanges();
                    return StatusCode(HttpStatusCode.Created);
                }

                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            


        }

        // PUT api/<controller>/5
        [ResponseType(typeof(Formak))]
        public IHttpActionResult Put(int id, [FromBody] Formak value)
        {
            
                try
                {

                    var result = ctx.Formak.Where(x => x.FormaId == id).FirstOrDefault();
                    if (result == null)
                    {
                        return NotFound();
                    }

                    if (value.Nev != null)
                    {
                        result.Nev = value.Nev;
                    }


                    var response = new FormaModel(result);

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
            
                var result = ctx.Formak.Where(x => x.FormaId == id).FirstOrDefault();
                if (result != null)
                {
                    ctx.Formak.Remove(result);
                    ctx.SaveChanges();

                    return Ok(result);
                }
                return NotFound();
            
        }
    }
}