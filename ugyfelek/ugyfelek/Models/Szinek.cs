using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ugyfelek.Models
{
    public class Szinek
    {
        [Key]
        public string SzinId { get; set; }
        public string szinNev { get; set; }
        public Szinek() { }
       
    }
}