using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;


namespace ugyfelek.Models
{
    public class Formak
    {
        [Key]
        public int FormaId { get; set; }
        public string Nev { get; set; }
        public string Rovidites { get; set; }
        public Formak() { }
    }
}