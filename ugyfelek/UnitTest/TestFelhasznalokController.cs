using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using ugyfelek.Models;
using ugyfelek.Database;
using ugyfelek.Controllers;
using System.Collections.Generic;
using System.Web.Http.Results;
using ugyfelnyilvantartas.Password;

namespace UnitTest
{

    [TestClass]
    public class TestFelhasznalokController
    {

        void FillTestDatabase(TestNyilvanContext ctx)
        {
            PasswordManager.CreatePasswordHash("asd123", out byte[] hash, out byte[] salt);
            ctx.Felhasznalok.Add(new Felhasznalok { FelhasznaloId = 0, Nev = "Teszt Béla", Cegek = new Cegek { }, CegId = 6, Email = "teszt1@email.com", Telszam = "3630111111", Szerepkor = "user", PasswdHash = hash, PasswdSalt = salt });
            ctx.Felhasznalok.Add(new Felhasznalok { FelhasznaloId = 1, Nev = "Teszt Sanyi", Cegek = new Cegek { }, CegId = 6, Email = "teszt2@email.com", Telszam = "3630222222", Szerepkor = "user", PasswdHash = hash, PasswdSalt = salt });
            ctx.Felhasznalok.Add(new Felhasznalok { FelhasznaloId = 2, Nev = "Teszt Oszteron", Cegek = new Cegek { }, CegId = 6, Email = "teszt3@email.com", Telszam = "363033333", Szerepkor = "user", PasswdHash = hash, PasswdSalt = salt });
        }
        public Felhasznalok GetDemoUser()
        {
            PasswordManager.CreatePasswordHash("asd123", out byte[] hash, out byte[] salt);
            return new Felhasznalok { FelhasznaloId = 3, Nev = "Teszt Béla", Cegek = new Cegek { }, CegId = 6, Email = "teszt4@email.com", Telszam = "363044444", Szerepkor = "user",PasswdHash=hash,PasswdSalt=salt };
        }

        [TestMethod]
        public void Get_ShouldReturnAllUsers()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);

            var controller = new FelhasznalokController(ctx);
            var result = controller.Get() as OkNegotiatedContentResult<List<UsersResponseModel>>;

            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.Count);
        }
        [TestMethod]
        public void Get_ShouldReturnSelectedUser()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);


            var controller = new FelhasznalokController(ctx);
            var result = controller.Get(1) as OkNegotiatedContentResult<UsersResponseModel>;

            Assert.IsNotNull(result);
            Assert.AreEqual(result.Content.Nev, "Teszt Sanyi");
        }
        //[TestMethod]
        //public void Post_ShouldPostUser()
        //{
        //    var ctx = new TestNyilvanContext();
        //    var User = GetDemoUser();


        //    var controller = new FelhasznalokController(ctx);
        //    controller.Post(new UsersRequestModel(User));
        //    var result = controller.Get() as OkNegotiatedContentResult<List<UsersResponseModel>>;


        //    Assert.IsNotNull(result);
        //    Assert.AreEqual(1, result.Content.Count);
        //}
        [TestMethod]
        public void Put_ShouldPutUser()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);

            var controller = new FelhasznalokController(ctx);
            controller.Put(2, new UsersUpdateModel { Nev = "Teszt Béla", CegId = 2, Email = "teszt4@email.com", Telszam = "363044444", Szerepkor = "user" ,OldPasswd="asd123",NewPasswd="valami"});
            var result = controller.Get(2) as OkNegotiatedContentResult<UsersResponseModel>;

            Assert.IsNotNull(result);
            Assert.AreEqual("Teszt Béla", result.Content.Nev);
        }
        [TestMethod]
        public void Delete_ShouldDeleteSelectedUser()
        {
            var ctx = new TestNyilvanContext();
            FillTestDatabase(ctx);
            var controller = new FelhasznalokController(ctx);
            controller.Delete(2);
            var result = controller.Get() as OkNegotiatedContentResult<List<UsersResponseModel>>;


            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Content.Count);
        }
    }
}
