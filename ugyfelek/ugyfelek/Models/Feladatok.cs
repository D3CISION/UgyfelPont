using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ugyfelek.Models
{
    public class Feladatok
    {
        public Feladatok() { }
        [Key]
        public int FeladatId { get; set; }
        public string Nev { get; set; }
        public string Leiras { get; set; }
        public string ismGyak { get; set; }
        public bool Allapot { get; set; }
        public string szinId { get; set; }
        public Szinek Szinek { get; set; }
        public DateTime Hatarido { get; set; }
        public int Csoport { get; set; }
    }
}