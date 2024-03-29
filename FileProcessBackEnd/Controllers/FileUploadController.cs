﻿using FileProcessBackEnd.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FileProcessBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IFileUploader _fileUploader;
        private readonly IFileProcessor _fileProcessor;
        public UploadController(IFileUploader fileUploader, IFileProcessor fileProcessor)
        {
            _fileUploader = fileUploader;
            _fileProcessor = fileProcessor;
        }

        [HttpPost("uploadfile", Name = "uploadfile")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UploadFile()
        {
            var files = Request.Form.Files;
            if (files.Count < 1)  throw new Exception("No files provided for upload");
            
            var file = files[0];

            if (await _fileUploader.CheckIfExcelFileAsync(file))
            {
                var fileName = await _fileUploader.WriteFileAsync(file);

                if (string.IsNullOrEmpty(fileName))  return BadRequest(new { message = "Empty file" });
                
                var result = await _fileProcessor.ExtractDataFromExcelFileAsync(fileName);
                return Ok(result);
            }
            else  return BadRequest(new { message = "Invalid file extension" });
            

        }
    }
}
