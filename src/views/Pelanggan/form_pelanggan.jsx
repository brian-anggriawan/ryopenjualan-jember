import React, { Component } from 'react';
import Modal from 'layouts/form_modal';
import { Input , FormGroup , Label  } from 'reactstrap';
import Select from 'react-select';
import { apiPost } from 'app';
import serialize from 'form-serialize';

export default class form_pelanggan extends Component {
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
            apiPost('pelanggan/edit' ,data)
            .then(res =>{
              if (res) {
                this.props.getData();
              }
            })
        }else{
            apiPost('pelanggan/tambah' ,data)
            .then(res =>{
              if (res) {
                this.props.getData();
              }
            })
        }
     }

    render() {
        let { mode , modal ,edit , flag } = this.props;

        return (
            <div>
                <Modal title={'Form Pelanggan'} mode={mode} modal={modal} idform={'pelanggan'} action={this.save}>
                    {
                        flag === 1 ?
                        <div> 
                            <FormGroup>
                                <Label for='kode_pelanggan'>Kode Pelanggan</Label>
                                <Input type='text' name='kode_pelanggan' defaultValue={edit.kode_pelanggan} readOnly/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='nnama_pelangganame'>Nama</Label>
                                <Input type='text' name='nama_pelanggan' autoFocus={true} defaultValue={edit.nama_pelanggan} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='alamat'>alamat</Label>
                                <Input type='text' name='alamat' defaultValue={edit.alamat} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='level_harga'>Level Harga</Label>
                                <Select options={[
                                    {
                                    value:'1',
                                    label: 'Ecer'
                                    },
                                    {
                                    value:'2',
                                    label: 'Murah'
                                    }
                                ]} name='level_harga' className='select' defaultValue={{  value: edit.level_harga, label: edit.nama_level }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='jenis_pelanggan'>Jenis</Label>
                                <Select options={[
                                    {
                                    value:'MEMBER',
                                    label: 'MEMBER'
                                    },
                                    {
                                    value:'UMUM',
                                    label: 'UMUM'
                                    }
                                ]} name='jenis_pelanggan' className='select' defaultValue={{  value: edit.jenis_pelanggan, label: edit.jenis_pelanggan }}/>
                            </FormGroup>
                        </div>

                        :
                        <div>
                            <FormGroup>
                                <Label for='kode_pelanggan'>Kode Pelanggan</Label>
                                <Input type='text' name='kode_pelanggan' autoFocus={true}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='nama_pelanggan'>Nama</Label>
                                <Input type='text' name='nama_pelanggan'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='alamat'>alamat</Label>
                                <Input type='text' name='alamat' />
                            </FormGroup>
                            <FormGroup>
                                <Label for='level_harga'>Level Harga</Label>
                                <Select options={[
                                    {
                                    value:'1',
                                    label: 'Ecer'
                                    },
                                    {
                                    value:'2',
                                    label: 'Murah'
                                    }
                                ]} name='level_harga' className='select'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='jenis_pelanggan'>Jenis</Label>
                                <Select options={[
                                    {
                                    value:'MEMBER',
                                    label: 'MEMBER'
                                    },
                                    {
                                    value:'UMUM',
                                    label: 'UMUM'
                                    }
                                ]} name='jenis_pelanggan' className='select'/>
                            </FormGroup>
                        </div>
                    }
                </Modal>
            </div>
        )
    }
}
