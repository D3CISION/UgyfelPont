using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ugyfelek.Models
{
    public class Tipusok
    {
        [Key]
        public int TipusId { get; set; }
        public string TipusNev { get; set; }

    }
}