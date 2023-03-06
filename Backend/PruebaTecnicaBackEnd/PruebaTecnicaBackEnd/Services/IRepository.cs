using PruebaTecnicaBackEnd.Data.Models;

namespace PruebaTecnicaBackEnd.Services
{
    public interface IRepository
    {
        public Task<List<AseguradoraDTO>> readAllData();
        public Task<string> createAseguradora(AseguradoraDTO aseguradora);

        public bool updateAseguradora(AseguradoraDTO aseguradora);

        public Task<bool> DeleteAseguradora(int id);

        public Task<List<AseguradoraDTO>> readAseguradorByName(string name);
    }
}
