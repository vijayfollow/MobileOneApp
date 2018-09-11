using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class ReviewAndRatings
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Ratings { get; set; }
        public string Comments { get; set; }
    }
}
