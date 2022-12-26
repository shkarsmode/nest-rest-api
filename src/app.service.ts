import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    
    private data = [{ id: 3, name: 'toyta', price: 300000 }];

    getHello() {
        return this.data;
    }

    setData(data) {
        this.data.push(data);
        return 'ok';
    }
}
