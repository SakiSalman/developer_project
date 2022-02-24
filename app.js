const dev_addForm = document.getElementById('dev_addForm');
const custom_alert = document.querySelector('.custom-alert');


// skills Load
const skillLload = () =>{
        const skill_loads = document.querySelector('#skill_select');

    axios.get('https://my-json-server.typicode.com/SakiSalman/dev-server/skill').then(data =>{


           
            let skills = '';

            data.data.map(skill =>{

                    skills +=`
                    <option value="${ skill.id }">${ skill.name }</option>
  
                    
                    `;


            });
            skill_loads.insertAdjacentHTML ('beforeend', skills);

            console.log(skill_loads);
       


    });

};

skillLload();


// all dev load


const alldevLoad =() =>{


        axios.get('https://my-json-server.typicode.com/SakiSalman/dev-server/developers').then( res =>{

                const dev_table = document.querySelector('#dev-table');
                let dev_list = "";

                res.data.map( (devs, index) =>{

                        dev_list +=`
                        <tr>
                        <td>${index + 1}</td>
                        <td>${devs.name}</td>
                        <td>${devs.email}</td>
                        <td><img class="${devs.photo}" style="object-fit: cover; width: 50px; height: 50px;" src="${devs.photo}" alt=""></td>
                        <td>
                            <a data-bs-toggle="modal" onclick=(viewDeveloper(${devs.id}))  href="#view-modal" class="btn btn-info btn-sm"><i class="fa fa-eye"></i></a>
                            <a data-bs-toggle="modal"  onclick=(editDeveloper(${devs.id}))  href="#edit_modal" class="btn btn-success btn-sm"><i class="fa fa-edit"></i></a>
                            <a data-bs-toggle="modal" onclick=(delateDevelopers(${devs.id}))  href="#delate_modal" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></a>
                        </td>
                    </tr>
                        
                        `
                        

                });
                dev_table.innerHTML = dev_list;
        });
}
alldevLoad();
// ad form

dev_addForm.addEventListener('submit', function (e){

        e.preventDefault();

           
        let name = this.querySelector('#name');
        let email = this.querySelector('#email');
        let photo = this.querySelector('#photo');
        let skill_lists = this.querySelector('#skill_select');
        console.log(skill_lists.value);

      
        if ( name.value == '' || email.value == '') {
            custom_alert.innerHTML = `
                 <div class="alert alert-warning" role="alert">
                        <p>All fields are required</p>
                </div>
            `
                
        } else {
            axios.post('https://my-json-server.typicode.com/SakiSalman/dev-server/developers', {

                                id : "",
                                name : name.value,
                                email : email.value,
                                photo : photo.value,
                                skillId : skill_lists.value


            }).then( res => {
                name.value = " ";
                email.value = " ";
                photo.value = " ";
                skill_lists.value = " ";
                alldevLoad();


            })
        }

        

});


// view Developer


const viewDeveloper = (id) =>{

        
        
        const dev_details = document.querySelector('#dev_details');

        axios.get('https://my-json-server.typicode.com/SakiSalman/dev-server/developers/'+ id).then(res=>{


                axios.get('https://my-json-server.typicode.com/SakiSalman/dev-server/skill/'+ id).then(skill =>{

                        dev_details.innerHTML = `
                                        
                                <div class="row">
                                        <div class="col-md-5">
                                                <img style="object-fit: cover; width: 100%;" src="${res.data.photo}" alt="">
                                        </div>
                                        <div class="col-md-7">
                                        <div class="row">
                                                <div class="col-12">
                                                        <div class="card shadow">
                                                <div class="card-body">
                                                <div class="dev-details-group">
                                                <div class="dev-heading">
                                                        <h4 class="text-primary font-weight-bold">Name</h4>
                                                </div>
                                                <div class="dev-heading">
                                                        <h4>${res.data.name}</h4>
                                                </div>
                                                </div>

                                                <div class="dev-details-group">
                                                <div class="dev-heading">
                                                        <h4 class="text-primary font-weight-bold">Skill</h4>
                                                </div>
                                                <div class="dev-heading">
                                                        <h4>${skill.data.name}</h4>
                                                </div>
                                                </div>

                                                <div class="dev-details-group">
                                                <div class="dev-heading">
                                                        <h4 class="text-primary font-weight-bold">Name</h4>
                                                </div>
                                                <div class="dev-heading">
                                                        <h4>${res.data.email}</h4>
                                                </div>
                                                </div>
                                                </div>
                                        </div>
                                        </div>
                                        <div class="col-12 mt-3">
                                        <h3>Descriptions</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, laborum, quae adipisci necessitatibus dignissimos amet eligendi ea eum quod odit id vitae dolorum sint repellendus ad nisi iusto! Nisi dolores repudiandae dolore laboriosam esse aut reprehenderit accusamus sint repellendus delectus porro, aliquam molestiae adipisci itaque, nobis totam eius cum aperiam!</p>
                                        </div>
                                </div>
                                </div>
                                </div>


        `
                        

        })
        });

               


        
}

/**
 * View Skills
 */

        



/**
 * 
 * Delate Developer
 */


 const delId = document.querySelector('#delId');

 const delateDevelopers = (id) =>{

        delId.setAttribute('delsrc', id);
        
 }

 delId.addEventListener('click', function(){

        let setattr = delId.getAttribute('delsrc')

        axios.delete('https://my-json-server.typicode.com/SakiSalman/dev-server/developers/'+ setattr).then( res =>{
                alldevLoad();

        });
 });


 /**
  * Edit Developer 
  */

 const editDeveloper = (id) =>{

               
        let ename = document.getElementById('ename');
        let edit_id = document.getElementById('edit_id');
        let eemail = document.getElementById('eemail');
        let ephoto = document.getElementById('ephoto');
        let eskill_select = document.getElementById('eskill_select');
        let preview = document.getElementById('epreview');

        axios.get('https://my-json-server.typicode.com/SakiSalman/dev-server/developers/'+ id).then(res =>{
                
                ename.value = res.data.name;
                edit_id.value = res.data.id;
                eemail.value = res.data.email;
                ephoto.value = res.data.photo
                eskill_select.value = res.data.skillId;
                preview.setAttribute('src', res.data.photo);
               


        });

 };

 const dev_editForm = document.querySelector('#dev_editForm');

 dev_editForm.addEventListener('submit', function (e){
        e.preventDefault();
        let ename = document.getElementById('ename');
        let edit_id = document.getElementById('edit_id');
        let eemail = document.getElementById('eemail');
        let ephoto = document.getElementById('ephoto');
        let eskill_select = document.getElementById('eskill_select');

       
        axios.patch('https://my-json-server.typicode.com/SakiSalman/dev-server/developers/'+ edit_id.value, {

                        id : "",
                        name : ename.value,
                        email : eemail.value,
                        photo : ephoto.value,
                        skillId : eskill_select.value

        }).then(res =>{


                alldevLoad();
        });


 })
