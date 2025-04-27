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
    public class TestCimekController
    {
        void FillTestDatabase(TestNyilvanContext ctx)
        {
            ctx.Cimek.Add(new Cimek { CimId=1,TelepulesNev="Karancslapujtó",Hazszam="1",Irsz=1111,Utca="Demo1" });
            ctx.Cimek.Add(new Cimek { CimId = 2, TelepulesNev = "Karancslapujtó", Hazszam = "2", Irsz = 2222, Utca = "Demo2" });
            ctx.Cimek.Add(new Cimek { CimId = 3, TelepulesNev = "Karancslapujtó", Hazszam = "3", Irsz = 3333, Utca = "Demo3" });
        }
        public Cimek GetDemoAddress()
        {
            return new Cimek { CimId = 4, TelepulesNev = "Karancslapujtó", Hazszam = "4", Irsz = 4444, Utca = "Demo4" };
        }
        [TestMethod]
        public void Get_ShouldReturnAllAddresses()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);

            var controller = new CimekController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<List<Cimek>>;

            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.Count);
        }
        [TestMethod]
        public void Get_ShouldReturnSelectedAddress()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);


            var controller = new CimekController(ctx);
            var result = controller.Get(1) as OkNegotiatedContentResult<Cimek>;

            Assert.IsNotNull(result);
            Assert.AreEqual(result.Content.TelepulesNev, "Karancslapujtó");
        }
        [TestMethod]
        public void Post_ShouldPostAddress()
        {
            var ctx = new TestNyilvanContext();
            var C = GetDemoAddress();


            var controller = new CimekController(ctx);
            controller.Post(new CimekController.CimModel(C));
            var result = controller.Get() as OkNegotiatedContentResult<List<Cimek>>;


            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Content.Count);
        }
        [TestMethod]
        public void Put_ShouldPutAddress()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);
            var C = GetDemoAddress();

            var controller = new CimekController(ctx);
           
            controller.Put(3, new CimekController.CimModel(C));
            var result = controller.Get(3) as OkNegotiatedContentResult<Cimek>;


            Assert.IsNotNull(result);
            Assert.AreEqual("Demo4", result.Content.Utca);
        }
        [TestMethod]
        public void Delete_ShouldDeleteSelectedAddress()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);

            var controller = new CimekController(ctx);
            controller.Delete(3);
            var result = controller.Get() as OkNegotiatedContentResult<List<Cimek>>;


            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Content.Count);
        }
    }
}
