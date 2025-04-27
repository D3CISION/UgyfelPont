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
    public class TestFelhasznaloFeladatController
    {
        void FillTestDatabase(TestNyilvanContext ctx)
        {
            ctx.FelhasznaloFeladat.Add(new FelhasznaloFeladat { felkapcsId=1,feladatId=1,felhasznaloId=1,Feladatok = { },Felhasznalok = { } });
            ctx.FelhasznaloFeladat.Add(new FelhasznaloFeladat { felkapcsId=2,feladatId=2,felhasznaloId=2,Feladatok = { },Felhasznalok = { } });
            ctx.FelhasznaloFeladat.Add(new FelhasznaloFeladat { felkapcsId=3,feladatId=3,felhasznaloId=3,Feladatok = { },Felhasznalok = { } });
           
        }
        public FelhasznaloFeladat GetDemoFF()
        {
            return new FelhasznaloFeladat { felkapcsId = 4, feladatId = 4, felhasznaloId = 4, Feladatok = { }, Felhasznalok = { } };
        }
        [TestMethod]
        public void Get_ShouldReturnAllFF()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);

            var controller = new FelhasznaloFeladatController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<List<FelhasznaloFeladat>>;

            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.Count);
        }
        [TestMethod]
        public void Get_ShouldReturnSelectedFF()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);


            var controller = new FelhasznaloFeladatController(ctx);
            var result = controller.Get(1) as OkNegotiatedContentResult<FelhasznaloFeladat>;

            Assert.IsNotNull(result);
            Assert.AreEqual(result.Content.feladatId, 1);
        }
        [TestMethod]
        public void Post_ShouldPostFF()
        {
            var ctx = new TestNyilvanContext();
            var FFDemo = GetDemoFF();


            var controller = new FelhasznaloFeladatController(ctx);
            controller.Post(new FelhasznaloFeladatController.FelhFeladatModel {feladatId=FFDemo.feladatId,felhasznaloId=FFDemo.felhasznaloId } );
            var result = controller.Get() as OkNegotiatedContentResult<List<FelhasznaloFeladat>>;


            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Content.Count);
        }
        //[TestMethod]
        //public void Put_ShouldPutFF()
        //{
        //    var ctx = new TestNyilvanContext();
        //    FillTestDatabase(ctx);



        //    var controller = new FelhasznaloFeladatController(ctx);
        //    controller.Put(3, new Fel);
        //    var result = controller.Get(3) as OkNegotiatedContentResult<Formak>;


        //    Assert.IsNotNull(result);
        //    Assert.AreEqual("PutoltDemo", result.Content.Nev);
        //}
        [TestMethod]
        public void Delete_ShouldDeleteSelectedFF()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);
            var controller = new FelhasznaloFeladatController(ctx);
            controller.Delete(3);
            var result = controller.Get() as OkNegotiatedContentResult<List<FelhasznaloFeladat>>;


            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Content.Count);
        }
    }
}
