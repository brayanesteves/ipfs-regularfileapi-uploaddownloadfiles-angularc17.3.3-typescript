import { Component, OnInit } from '@angular/core';
import { RouterOutlet }      from '@angular/router';
import   IpfsClient          from 'ipfs-http-client';

const toBuffer = require('it-to-buffer');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title    = 'ipfs-regularfileapi-uploaddownloadfiles-angularc17.3.3-typescript';
  ipfsHash = '';
  ipfs:any;

  constructor() {
    this.ipfs = IpfsClient({ host:'ipfs.infura.io', port:'5001', protocol:'https', });
  }

  async run(file:any) {
    const result = [];
    
    for await(const _result of this.ipfs.add(file)) {
      result.push(_result);
    }
    // console.log(result);
    this.ipfsHash = '';
    this.ipfsHash = result[0].cid.string;

    const fileContents = await this.ipfs.cat(this.ipfsHash);
    console.log(fileContents.toString());
  }

  ngOnInit(): void {
    const fileSelector = document.getElementById('img');
    fileSelector.addEventListener('change', (event:any) => {
      const file = event.target.files[0];
      console.log(file);
      this.run(file);
    });
  }
}