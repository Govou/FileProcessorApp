using FileProcessBackEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileProcessBackEnd.Services
{
    public interface IFileProcessor
    {
        Task<ProccesedData> ExtractDataFromExcelFileAsync(string filname);
    }
}
