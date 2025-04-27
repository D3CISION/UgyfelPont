using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ugyfelek.Models
{
    public class FelhasznaloFeladat
    {
        [Key]
        public int felkapcsId { get; set; }
        [Key]
        public int feladatId { get; set; }
        public virtual Feladatok Feladatok { get; set; }
        [Key]
        public int felhasznaloId { get; set; }
        public virtual Felhasznalok Felhasznalok { get; set; }
    }
}