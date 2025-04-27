using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using ugyfelek.Models;
using ugyfelek.Database;
using ugyfelek.Controllers;
using System.Collections.Generic;
using System.Web.Http.Results;

namespace UnitTest
{
    [TestClass]
    public class TestFormaController
    {
        void FillTestDatabase(TestNyilvanContext ctx)
        {
            ctx.Formak.Add(new Formak { FormaId=1,Nev="Demo0" });
            ctx.Formak.Add(new Formak { FormaId = 2, Nev = "Demo1" });
            ctx.Formak.Add(new Formak { FormaId = 3, Nev = "Demo2" });
        }
        public Formak GetDemoForma()
        {
            return new Formak { FormaId = 4, Nev = "K.N" };
        }
        [TestMethod]
        public void Get_ShouldReturnAllForms()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);

            var controller = new FormaController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<List<Formak>>;

            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.Count);
        }
        [TestMethod]
        public void Get_ShouldReturnSelectedForms()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);


            var controller = new FormaController(ctx);
            var result = controller.Get(1) as OkNegotiatedContentResult<Formak>;

            Assert.IsNotNull(result);
            Assert.AreEqual(result.Content.Nev, "Demo0");
        }
        [TestMethod]
        public void Post_ShouldPostForm()
        {
            var ctx = new TestNyilvanContext();
            var Forma = GetDemoForma();


            var controller = new FormaController(ctx);
            controller.Post(new Formak { FormaId=Forma.FormaId,Nev=Forma.Nev });
            var result = controller.Get() as OkNegotiatedContentResult<List<Formak>>;


            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Content.Count);
        }
        [TestMethod]
        public void Put_ShouldPutForm()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);
            


            var controller = new FormaController(ctx);
            controller.Put(3,new Formak { FormaId = 3, Nev = "PutoltDemo" });
            var result = controller.Get(3) as OkNegotiatedContentResult<Formak>;


            Assert.IsNotNull(result);
            Assert.AreEqual("PutoltDemo", result.Content.Nev);
        }
        [TestMethod]
        public void Delete_ShouldDeleteSelectedForm()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);
            var controller = new FormaController(ctx);
            controller.Delete(3);
            var result = controller.Get() as OkNegotiatedContentResult<List<Formak>>;


            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Content.Count);
        }
    }
}
