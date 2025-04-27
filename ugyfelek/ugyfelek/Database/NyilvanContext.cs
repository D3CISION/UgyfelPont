using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;
using ugyfelek.Models;


namespace ugyfelek.Database
{
    public class NyilvanContext :DbContext, INyilvanContext
    {
        public DbSet<Cegek> Cegek { get; set; }
        public DbSet<Cimek> Cimek { get; set; }
        public DbSet<Feladatok> Feladatok { get; set; }
        public DbSet<Felhasznalok> Felhasznalok { get; set; }
        public DbSet<Formak> Formak { get; set; }
        
        public DbSet<Szinek> Szinek { get; set; }
        

        public DbSet<FelhasznaloFeladat> FelhasznaloFeladat { get; set; }

        public NyilvanContext() : base("name=NyilvanContext") { }

        public NyilvanContext(DbConnection existingConnection, bool contextOwnsConnection)
                : base(existingConnection, contextOwnsConnection) { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Entity<FelhasznaloFeladat>().HasKey(ff => new { ff.feladatId, ff.felhasznaloId });
            base.OnModelCreating(modelBuilder);
        }

    }
}