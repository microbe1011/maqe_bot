class Bot {
    private direction: string = 'North';
    private positionX: number = 0;
    private positionY: number = 0;

    rol(side: string): void {
        switch (this.direction) {
            case 'North':
                this.direction = side == 'R' ? 'East' : 'West';
                break
            case 'East':
                this.direction = side == 'R' ? 'South' : 'North';
                break
            case 'South':
                this.direction = side == 'R' ? 'West' : 'East';
                break
            case 'West':
                this.direction = side == 'R' ? 'North' : 'South';
                break
        }
    }

    walk(point: number) {
        switch (this.direction) {
            case 'North':
                this.positionY += point;
                break
            case 'East':
                this.positionX += point;
                break
            case 'South':
                this.positionY -= point;
                break
            case 'West':
                this.positionX -= point;
                break
        }
    }

    process(cmds: string) {
        let match = cmds.match(/([RL])|(W\d+)/g);

        if (match != null) {
            match.forEach(cmd => {
                if (cmd.startsWith('W')) {
                    // remove W by slice(1)
                    this.walk(parseInt(cmd.slice(1)));
                } else {
                    this.rol(cmd);
                }
            });

            console.log(`X: ${this.positionX} Y: ${this.positionY} Direction: ${this.direction}`);
        } else {
            // not match with pattern R | L | W(N)
            console.log('invalid command')
        }

        process.exit();
    }
}

const bot = new Bot();
bot.process(process.argv[2]);
