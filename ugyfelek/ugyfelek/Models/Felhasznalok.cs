using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ugyfelek.Models
{
    public class Felhasznalok
    {
        [Key]
        public int FelhasznaloId { get; set; }
        public string Nev { get; set; }
        public string Telszam { get; set; }
        public string Email { get; set; }
    
        public string Szerepkor { get; set; }
        

        [Column("passwd_hash")]
        public byte[] PasswdHash { get; set; }
        [Column("passwd_salt")]
        public byte[] PasswdSalt { get; set; }
        public int CegId { get; set; }
        public  Cegek Cegek { get; set; }

    }
}