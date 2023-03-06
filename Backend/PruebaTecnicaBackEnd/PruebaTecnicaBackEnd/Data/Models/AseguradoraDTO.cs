using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace PruebaTecnicaBackEnd.Data.Models
{
    public class AseguradoraDTO
    {
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public decimal Comision { get; set; }
        public bool Estado { get; set; }
    }
}
