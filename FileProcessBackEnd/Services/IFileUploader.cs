using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileProcessBackEnd.Services
{
    public interface IFileUploader
    {
        Task<bool> CheckIfExcelFileAsync(IFormFile file);
        Task<string> WriteFileAsync(IFormFile file);
    }
}
