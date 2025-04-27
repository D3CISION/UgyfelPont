using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ugyfelek.Database;
using ugyfelek.Controllers;
using ugyfelek.Models;
using System.Data.Entity;

namespace UnitTest
{
    class TestNyilvanContext :INyilvanContext
    {
    
        public TestNyilvanContext()
        {
            Cegek = new TestDbSet<Cegek>();
            Cimek = new TestDbSet<Cimek>();
            Feladatok = new TestDbSet<Feladatok>();
            FelhasznaloFeladat = new TestDbSet<FelhasznaloFeladat>();
            Felhasznalok = new TestDbSet<Felhasznalok>();
            Formak = new TestDbSet<Formak>();
            Szinek = new TestDbSet<Szinek>(); ;
        }

        public DbSet<Cegek> Cegek { get; set; }
        public DbSet<Cimek> Cimek { get; set; }
        public DbSet<Feladatok> Feladatok  { get; set; }
        public DbSet<FelhasznaloFeladat> FelhasznaloFeladat { get; set; }
        public DbSet<Felhasznalok> Felhasznalok { get; set; }
        public DbSet<Formak> Formak { get; set; }
        public DbSet<Szinek> Szinek { get; set; }

        public void Dispose() { }
        public int SaveChanges()
        {
            return 0;
        }


    }
}
