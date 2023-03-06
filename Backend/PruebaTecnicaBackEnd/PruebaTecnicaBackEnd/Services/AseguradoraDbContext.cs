using Microsoft.EntityFrameworkCore;
using PruebaTecnicaBackEnd.Data.Models;

namespace PruebaTecnicaBackEnd.Services
{
    public class AseguradoraDbContext : DbContext
    {
        public AseguradoraDbContext()
        {

        }


        public AseguradoraDbContext(DbContextOptions<AseguradoraDbContext> option) : base(option)
        {

        }

        public virtual DbSet<AseguradoraDTO> MantenimientoDeAseguradora { get; set; }
    }
}
