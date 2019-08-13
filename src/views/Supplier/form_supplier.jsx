import React, { Component } from 'react';
import Modal from 'layouts/form_modal';
import { Input , FormGroup , Label  } from 'reactstrap';
import { apiPost } from 'app';
import serialize from 'form-serialize';
import dt from 'moment';

export default class form_supplier extends Component {
    constructor(){
        super()
        this.state={

        }
        this.save = this.save.bind(this);
    }

    save(){
        let data =  serialize(document.getElementById('pelanggan') ,{hash: true});
 
        if(this.props.flag === 1){
            data.id = this.props.edit.id;
            apiPost('supplier/edit' ,data)
            .then(res =>{
              if (res) {
                this.props.getData();
              }
            })
        }else{
            apiPost('supplier/tambah' ,data)
            .then(res =>{
              if (res) {
                this.props.getData();
              }
            })
        }
     }

    render() {
        let { modal , mode ,edit , flag , count } = this.props;
        let tanggal = dt(new Date()).format('l').replace('/','').replace('/','');
 
        return (
            <div>
                <Modal title={'Form Supplier'} modal={modal} mode={mode} idform={'pelanggan'} action={this.save} >
                    {
                        flag === 1 ? 
                        <div>
                            <FormGroup>
                                <Label for='kode_supplier'>Kode</Label>
                                <Input type='text' name='kode_supplier' defaultValue={edit.kode_supplier} readOnly />
                            </FormGroup>
                             <FormGroup>
                                <Label for='nama_supplier'>Nama</Label>
                                <Input type='text' name='nama_supplier' defaultValue={edit.nama_supplier} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='alamat'>alamat</Label>
                                <Input type='text' name='alamat' defaultValue={edit.alamat}/>
                            </FormGroup>
                        </div>
                        :
                        <div>
                            <FormGroup>
                                <Label for='kode_supplier'>Kode</Label>
                                <Input type='text' name='kode_supplier' defaultValue={`SPR-${count+1}${tanggal}`} readOnly />
                            </FormGroup>
                             <FormGroup>
                                <Label for='nama_supplier'>Nama</Label>
                                <Input type='text' name='nama_supplier' />
                            </FormGroup>
                            <FormGroup>
                                <Label for='alamat'>alamat</Label>
                                <Input type='text' name='alamat' />
                            </FormGroup>
                        </div>
                    }
                </Modal>
            </div>
        )
    }
}
