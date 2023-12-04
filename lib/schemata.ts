type Patient = {
    pid: number;
    fname: string;
    lname: string;
    dob: string;
    reasonforcheckingin: string;
    insurance_no: number;
    address: {
        street: string;
        city: string;
        state: string;
        zip: number;
    };
    sexual_orientation: string;
    doctorid: number;
};

export default Patient;