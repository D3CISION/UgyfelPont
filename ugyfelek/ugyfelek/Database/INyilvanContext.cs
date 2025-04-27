using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using ugyfelek.Models;

namespace ugyfelek.Database
{
    public interface INyilvanContext : IDisposable
    {
        DbSet<Cegek> Cegek { get; }
        DbSet<Cimek> Cimek { get; }
        DbSet<Feladatok> Feladatok  { get; }
        DbSet<Felhasznalok> Felhasznalok { get; }
        DbSet<Formak> Formak { get; }
    
        DbSet<Szinek> Szinek { get; }
        
        DbSet<FelhasznaloFeladat> FelhasznaloFeladat { get; set; }

        int SaveChanges();

    }
}