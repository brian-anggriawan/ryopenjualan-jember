import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import Tabel from 'components/tabel_pick';
import { Input } from 'reactstrap';

export default class list_member extends Component {
    constructor(){
        super()
        this.state = { value: ''}

        this.proses = this.proses.bind(this);    
    }

    proses(id){
        let { setMember , member , mode} = this.props;

        let data = member.filter( x => x.id  === id)[0];
        setMember(data.kode_pelanggan , data.nama_pelanggan , data.alamat,data.jenis_pelanggan);
        this.setState({ value:''})
        mode();
    }
    

    render() {
        
        let { mode , modal , member } = this.props;
        let { value } = this.state;

        // let filter = member.filter(x => {
        //     return x.kode_pelanggan.toLowerCase().includes(value.toLowerCase())
        // });

        let filter = member.filter(x => {
            if (x.kode_pelanggan.toLowerCase().includes(value.toLowerCase()) ) {
                return x.kode_pelanggan.toLowerCase().includes(value.toLowerCase()) 
            }else{
                return x.nama_pelanggan.toLowerCase().includes(value.toLowerCase()) 
            }
                
        });

        let pick = (e) =>{
           if (e === 13) {
               this.proses(filter[0].id)
           }
        }

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
              this.proses(row.id)
            }
          };

        return (
            <Modal title={'List Member'} mode={mode} modal={modal}>
                <div className='mb-3'>
                    <Input autoFocus={true} type='text' placeholder='Kode Member' onKeyUp={(e)=> pick(e.keyCode)} onChange={(e)=> this.setState({ value: e.target.value  })} value={value} />
                </div>
                 <Tabel
                    data ={filter}
                    keyField = {'id'}
                    rowEvents={rowEvents}
                    columns ={[
                    {
                        dataField: 'kode_pelanggan',
                        text: 'Kode Pelanggan'
                    },
                    {
                        dataField: 'nama_pelanggan',
                        text: 'Nama Pelanggan'
                    },
                    {
                        dataField: 'alamat',
                        text: 'Alamat'
                    },
                    {
                        dataField: 'jenis_pelanggan',
                        text: 'Jenis'
                    }
                    ]}                            
                />
            </Modal>
        )
    }
}
