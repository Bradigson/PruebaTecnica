using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaBackEnd.Data.Helpers;
using PruebaTecnicaBackEnd.Data.Models;
using PruebaTecnicaBackEnd.Services;
using System.IdentityModel.Tokens.Jwt;

namespace PruebaTecnicaBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AseguradoraController : ControllerBase
    {
        private readonly IRepository _services;

        public AseguradoraController(IRepository services)
        {
            _services = services;
        }


        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<AseguradoraDTO>>> AseguradoraReadAllData()
        {
            var _response = await _services.readAllData();
            return _response;
        }


        [HttpPost("create")]
        [Authorize]
        public async Task<ActionResult<AseguradoraDTO>> createAseguradora(AseguradoraDTO aseguradora)
        {
            try
            {

                if (string.IsNullOrEmpty(aseguradora.Nombre) || aseguradora.Nombre == "string")
                {
                    return BadRequest(new { status = 400, errorMessage = "Debe de ingresar el nombre de la aseguradora" });
                }
                else
                {
                    var result = await _services.createAseguradora(aseguradora);

                    if (!string.IsNullOrEmpty(result))
                    {
                        return Ok(new { state = 200, messate = "Aseguradora creada correctamente" });
                    }

                    return BadRequest(new { status = 400, errorMessage = "Aseguradora no creada" });

                }




            }
            catch (Exception ex)
            {
                return BadRequest(new { status = 400, errorMessage = ex.Message });
            }
        }





        [HttpPut("update")]
        [Authorize]
        public async Task<ActionResult<AseguradoraDTO>> updateAseguradora(AseguradoraDTO aseguradora)
        {
            try
            {

                if (string.IsNullOrEmpty(aseguradora.Nombre) || aseguradora.Nombre == "string")
                {
                    return BadRequest(new { status = 400, errorMessage = "Debe de ingresar el nombre de la aseguradora" });
                }
                else
                {
                    var result = _services.updateAseguradora(aseguradora);

                    if (result)
                    {
                        return Ok(new { state = 200, messate = "Aseguradora actualizada correctamente" });
                    }

                    return BadRequest(new { status = 400, errorMessage = "Aseguradora no actualizada" });

                }


            }
            catch (Exception ex)
            {
                return BadRequest(new { status = 400, errorMessage = ex.Message });
            }
        }


        [HttpDelete("id")]
        [Authorize]
        public async Task<ActionResult<AseguradoraDTO>> deleteAseguradora(int id)
        {
            try
            {
                var result = await _services.DeleteAseguradora(id);

                if (result)
                {
                    return Ok(new { state = 200, messate = "Aseguradora eliminada correctamente" });
                }

                return BadRequest(new { status = 400, errorMessage = "Aseguradora no eliminda" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = 400, errorMessage = ex.Message });
            }
        }



        [HttpGet("nombre")]
        [Authorize]
        public async Task<ActionResult<List<AseguradoraDTO>>> readByName(string name)
        {
            try
            {
                if (string.IsNullOrEmpty(name))
                {
                    return BadRequest(new { status = 400, errorMessage = "Debe de ingresar una asegurado" });
                }
                else
                {
                    var result = await _services.readAseguradorByName(name);

                    if (result != null)
                    {
                        return Ok(result);
                    }

                    return BadRequest(new { status = 400, errorMessage = "Aseguradora no encontrada" });

                }
                
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = 400, errorMessage = ex.Message });
            }
        }





        [HttpPost("login")]
        [AllowAnonymous]
        public ActionResult<object> Login([FromBody] LoginDTO login)
        {
            var jwtHelper = new JWTHelper("Temporal@RNTT#ws");
            var token = jwtHelper.CreateToken(login.Name);

            return Ok(new
            {
                msg = login.Name,
                token
            });
        }
    }
}
