using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class SearchProducts
    {
        public List<SearchNames> ProductNames { get; set; }
        public int MinValue { get; set; }
        public int MaxValue { get; set; }
    }

    public class SearchNames
    {
        public string ProductName { get; set; }
    }

}
