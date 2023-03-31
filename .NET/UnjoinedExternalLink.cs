using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Sabio.Models.Domain.ExternalLinks
{
    public class UnjoinedExternalLink
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public int UrlTypeId { get; set; }
        public int EntityId { get; set; }
        public int EntityTypeId { get; set; }
    }
}
