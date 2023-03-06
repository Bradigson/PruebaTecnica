using Microsoft.EntityFrameworkCore;
using PruebaTecnicaBackEnd.Data.Models;

namespace PruebaTecnicaBackEnd.Services
{
    public class Repository : IRepository
    {
        private readonly AseguradoraDbContext _dbcontext;

        public Repository(AseguradoraDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        
        //read
        public async Task<List<AseguradoraDTO>> readAllData()
        {
            try
            {
                 var _response = _dbcontext.MantenimientoDeAseguradora.ToList();
                if (_response.Any())
                {
                    return _response;
                }

                return new List<AseguradoraDTO>();

            }
            catch(Exception ex)
            {
                System.Diagnostics.Debug.Print(ex.Message);
                return new List<AseguradoraDTO>();
            }
        }


        //create
        public Task<string> createAseguradora(AseguradoraDTO aseguradora)
        {
            try
            {
               

                _dbcontext.Add(aseguradora);
                _dbcontext.SaveChanges();
                return Task.FromResult("Aseguradora creada correctamente");


            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
                return Task.FromResult(ex.Message);
            }
        }



        //update
        public bool updateAseguradora(AseguradoraDTO aseguradora)
        {

            try
            {
                _dbcontext.MantenimientoDeAseguradora.Update(aseguradora);
                _dbcontext.SaveChanges();
                return true;
            }

            catch (Exception ex)
            {
                System.Diagnostics.Debug.Print(ex.Message);
                System.Diagnostics.Debug.Print("Error");
                return false;

            }



        }

        //delete
        public async Task<bool> DeleteAseguradora(int id)
        {
            try
            {
                var deletePeople = await _dbcontext.MantenimientoDeAseguradora.FindAsync(id);
                _dbcontext.Remove(deletePeople);
                await _dbcontext.SaveChangesAsync();

                return true;
            }catch(Exception ex)
            {
                System.Diagnostics.Debug.Print(ex.Message);
                return false;
            }
        }


        //read by name
        public async Task<List<AseguradoraDTO>> readAseguradorByName(string name)
        {
            try
            {
                var result = await _dbcontext.MantenimientoDeAseguradora.Where(n => n.Nombre == name).ToListAsync();
                return result;

            }catch(Exception ex)
            {
                return new List<AseguradoraDTO>();
            }
        }
    }
}
