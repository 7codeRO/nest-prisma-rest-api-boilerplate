// import { Controller } from "@nestjs/common";

// @Controller()
// export class KafkaController {


//   async onModuleInit() {
//     this.client.subscribeToResponseOf('hero.kill.dragon');
//     await this.client.connect();
//   }
  

//   @MessagePattern('hero.kill.dragon')
//   killDragon(@Payload() message: KillDragonMessage): any {
//     const dragonId = message.dragonId;
//     const items = [
//       { id: 1, name: 'Mythical Sword' },
//       { id: 2, name: 'Key to Dungeon' },
//     ];
//     return items;
//   }
// }