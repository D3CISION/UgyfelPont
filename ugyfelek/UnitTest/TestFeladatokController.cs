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
    public class TestFeladatokController
    {
        void FillTestDatabase(TestNyilvanContext ctx)
        {
            ctx.Feladatok.Add(new Feladatok {FeladatId=0,Allapot=false,Csoport=0,Hatarido=DateTime.Now,ismGyak="havi",Leiras="Teszt Feladat1",Nev="TesztFel1",Szinek=new Szinek { },szinId="tesztSzin1" });
            ctx.Feladatok.Add(new Feladatok { FeladatId = 1, Allapot = false, Csoport = 1, Hatarido = DateTime.Now, ismGyak = "heti", Leiras = "Teszt Feladat2", Nev = "TesztFel2", Szinek = new Szinek { }, szinId = "tesztSzin2" });
            ctx.Feladatok.Add(new Feladatok { FeladatId = 2, Allapot = false, Csoport = 2, Hatarido = DateTime.Now, ismGyak = "napi", Leiras = "Teszt Feladat3", Nev = "TesztFel3", Szinek = new Szinek { }, szinId = "tesztSzin3" });
        }
        public Feladatok GetDemoTask()
        {
            return new Feladatok { FeladatId = 3, Allapot = true, Csoport = 0, Hatarido = DateTime.Now, ismGyak = "havi", Leiras = "Teszt Feladat4", Nev = "TesztFel4", Szinek = new Szinek { }, szinId = "tesztSzin4" };
        }
        [TestMethod]
        public void Get_ShouldReturnAllTasks()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);

            var controller = new FeladatokController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<List<Feladatok>>;

            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.Count);
        }
        [TestMethod]
        public void Get_ShouldReturnSelectedTask()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);


            var controller = new FeladatokController(ctx);
            var result = controller.Get(1) as OkNegotiatedContentResult<Feladatok>;

            Assert.IsNotNull(result);
            Assert.AreEqual("TesztFel2",result.Content.Nev);
        }
        [TestMethod]
        public void Post_ShouldPostTask()
        {
            var ctx = new TestNyilvanContext();
            var T = GetDemoTask();


            var controller = new FeladatokController(ctx);
            controller.Post(new FeladatokController.FeladatokModel(T) );
            var result = controller.Get() as OkNegotiatedContentResult<List<Feladatok>>;


            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Content.Count);
        }
        [TestMethod]
        public void Put_ShouldPutTask()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);
            var T = GetDemoTask();

            var controller = new FeladatokController(ctx);

            controller.Put(2, new FeladatokController.FeladatokModel(T));
            var result = controller.Get(2) as OkNegotiatedContentResult<Feladatok>;


            Assert.IsNotNull(result);
            Assert.AreEqual("TesztFel4",result.Content.Nev);
        }
        [TestMethod]
        public void Delete_ShouldDeleteSelectedTask()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);

            var controller = new FeladatokController(ctx);
            controller.Delete(2);
            var result = controller.Get() as OkNegotiatedContentResult<List<Feladatok>>;


            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Content.Count);
        }
    }
}
