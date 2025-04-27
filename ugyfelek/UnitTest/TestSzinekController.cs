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
    public class TestSzinekController
    {
        void FillTestDatabase(TestNyilvanContext ctx)
        {
            ctx.Szinek.Add(new Szinek { SzinId = "0", szinNev = "Demo0" });
            ctx.Szinek.Add(new Szinek { SzinId = "1", szinNev = "Demo1" });
            ctx.Szinek.Add(new Szinek { SzinId = "2", szinNev = "Demo2" });
        }
        public Szinek GetDemoSzinek()
        {
            return new Szinek { SzinId = "asd", szinNev = "rózsaszin" };
        }
        [TestMethod]
        public void Get_ShouldReturnAllColors()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);

            var controller = new SzinekController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<List<Szinek>>;

            Assert.IsNotNull(result);
            Assert.AreEqual(3,result.Content.Count);
        }
        [TestMethod]
        public void Get_ShouldReturnSelectedColor()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);


            var controller = new SzinekController(ctx);
            var result = controller.Get("0") as OkNegotiatedContentResult<Szinek>;

            Assert.IsNotNull(result);
            Assert.AreEqual(result.Content.szinNev,"Demo0");
        }
        [TestMethod]
        public void Post_ShouldPostColor()
        {
            var ctx = new TestNyilvanContext();
            var szin = GetDemoSzinek();


            var controller = new SzinekController(ctx);
            controller.Post(new Szinek {SzinId=szin.SzinId,szinNev=szin.szinNev });
            var result = controller.Get() as OkNegotiatedContentResult<List<Szinek>>;

           
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Content.Count);
        }
    }
}
