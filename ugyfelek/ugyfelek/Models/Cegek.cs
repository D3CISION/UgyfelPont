using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;


namespace ugyfelek.Models
{
    public class Cegek
    {
        [Key]
        public int CegId { get; set; }

        public string Telszam { get; set; }
        public string Email { get; set; }
        public string Nev { get; set; }
        
        public virtual Formak Forma { get; set; }
        public int FormaId { get; set; }
        public virtual Cimek Cim { get; set; }
        public int CimId { get; set; }
        public Cegek()
        {

        }
        public Cegek(int CegId, string Telszam, string Email, string Nev, int formaid, string Telepules, int? Irsz, string Utca, string Hazszam)
        {
            this.CegId = CegId;
            Cim = new Cimek();
            Forma = new Formak();
            this.Telszam = Telszam;
            this.Email = Email;
            this.Nev = Nev;
            Cim.TelepulesNev = Telepules;
            Cim.Irsz = Irsz;
            Forma.FormaId = formaid;
            Cim.Utca = Utca;
            Cim.Hazszam = Hazszam;
        }
    }
}