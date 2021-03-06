﻿using ATCommon.Global;
using System;
using System.Collections.Generic;

namespace ATCommon.Models
{
    public class User
    {
        public string id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string nickName { get; set; }
        public string gender { get; set; }
        public DateTime birthday { get; set; }
        public string birthPlace { get; set; }
        public string address { get; set; }
        public string picture { get; set; }
        public string phoneNumber { get; set; }
        public string email { get; set; }
        public string details { get; set; }
        public DateTime diedDay { get; set; }
        public string familyId { get; set; }
        public string fatherId { get; set; }
        public string motherId { get; set; }
        public string spouseId { get; set; }

        public string classOrigin { get; set; }
        public string socialOrigin { get; set; }
        public string nationalOrigin { get; set; }
        public string nationality { get; set; }
        public string party { get; set; }

        public List<UserEducationHistory> educationHistories { get; set; }
        public List<UserWorkHistory> workHistories { get; set; }
        public List<UserEvent> workEvents { get; set; }

        /// <summary>
        /// methods
        /// </summary>

        public string FullName { get => firstName + " " + lastName; }
        public bool IsMale { get => gender == Constants.genders[0].value; }
    }
}
