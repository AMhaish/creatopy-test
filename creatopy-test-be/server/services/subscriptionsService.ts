import { RedisPubSub } from "graphql-redis-subscriptions";
import EventService from "./eventService";

export default class SubscriptionsService {
  subscriptionPubSub: RedisPubSub;
  eventService: EventService;
  constructor(subscriptionPubSub: RedisPubSub, eventService: EventService) {
    this.subscriptionPubSub = subscriptionPubSub;
    this.eventService = eventService;
  }

  listenEvents() { }
};
