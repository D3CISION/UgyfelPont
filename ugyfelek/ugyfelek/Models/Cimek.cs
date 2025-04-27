using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ugyfelek.Models
{
    public class Cimek
    {
        public Cimek() { }
        [Key]
        public int CimId { get; set; }
        public string Hazszam { get; set; }
        public string Utca { get; set; }
        public string TelepulesNev { get; set; }
        public int? Irsz { get; set; }
        
    }
}