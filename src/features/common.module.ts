import { Module } from '#di';
import { RoutingModule } from '#routing';

@Module({
  imports: [RoutingModule],
  providers: [],
})
export class CommonModule {}
