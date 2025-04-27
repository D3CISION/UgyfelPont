using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Web.Http.Results;
using ugyfelek.Controllers;
using ugyfelek.Database;
using ugyfelek.Models;

namespace UnitTest
{
    [TestClass]
    public class TestCegekController
    {
        void FillTestDatabase(TestNyilvanContext ctx)
        {
            ctx.Cegek.Add(new Cegek { CegId = 0, Nev = "Valami1", Email = "demo@email0.com", Telszam = "06301111111", CimId = 0, Cim = new Cimek { }, Forma = new Formak { }, FormaId = 0 });
            ctx.Cegek.Add(new Cegek { CegId = 1 , Nev = "Valami2", Email = "demo@email1.com", Telszam = "06302222222", CimId = 1, Cim = new Cimek { }, Forma = new Formak { }, FormaId = 1 });
            ctx.Cegek.Add(new Cegek { CegId = 2, Nev = "Valami3", Email = "demo@email2.com", Telszam = "06303333333", CimId = 2, Cim = new Cimek { }, Forma = new Formak { }, FormaId = 2 });
        }
        public Cegek GetDemoCompany()
        {
            return (new Cegek { CegId = 3, Nev = "Valami", Email = "demo3@email.com", Telszam = "06303222111", CimId = 0, Cim = new Cimek { }, Forma = new Formak { }, FormaId = 0 }); ;
        }
        [TestMethod]
        public void Get_ShouldReturnAllCompanies()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);

            var controller = new CegekController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<List<Cegek>>;

            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.Count);
        }
        [TestMethod]
        public void Get_ShouldReturnSelectedCompany()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);


            var controller = new CegekController(ctx);
            var result = controller.Get(1) as OkNegotiatedContentResult<Cegek>;

            Assert.IsNotNull(result);
            Assert.AreEqual(result.Content.Nev, "Valami2");
        }
        [TestMethod]
        public void Post_ShouldPostCompany()
        {
            var ctx = new TestNyilvanContext();
            var C = GetDemoCompany();


            var controller = new CegekController(ctx);
            controller.Post(new CegekController.CegekModel(C));
            var result = controller.Get() as OkNegotiatedContentResult<List<Cegek>>;


            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Content.Count);
        }
        [TestMethod]
        public void Put_ShouldPutCompany()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);
            var C = GetDemoCompany();

            var controller = new CegekController(ctx);

            controller.Put(2, new CegekController.CegekUpdateModel(C));
            var result = controller.Get(2) as OkNegotiatedContentResult<Cegek>;


            Assert.IsNotNull(result);
            Assert.AreEqual("Valami", result.Content.Nev);
        }
        [TestMethod]
        public void Delete_ShouldDeleteSelectedCompany()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);

            var controller = new CegekController(ctx);
            controller.Delete(2);
            var result = controller.Get() as OkNegotiatedContentResult<List<Cegek>>;


            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Content.Count);
        }
    }
}
