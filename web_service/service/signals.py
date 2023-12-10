from django.db.models import Sum
from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver

from service.models import Maintenance, Part


@receiver(post_save, sender=Maintenance)
def maintenance_post_save(sender, instance, **kwargs):
    working_time = instance.working_time
    working_type = instance.working_type.price
    working_price = working_type * working_time
    oil_price = instance.car_model.engine.oil.price
    oil_quantity = instance.car_model.engine.oil_count
    oil_cost = oil_price * oil_quantity
    parts_cost = (Part.objects.filter(maintenances__id=instance.id)
                  .aggregate(Sum('price')).get('price__sum'))
    total_cost = working_price + oil_cost + parts_cost \
        if parts_cost else working_price + oil_cost
    sender.objects.filter(pk=instance.pk).update(total_cost=total_cost)


@receiver(m2m_changed, sender=Maintenance.parts.through)
def maintenances_m2m_changed(sender, instance, action, **kwargs):
    if action == 'post_add' or action == 'post_remove':
        working_time = instance.working_time
        working_type = instance.working_type.price
        working_price = working_type * working_time
        oil_price = instance.car_model.engine.oil.price
        oil_quantity = instance.car_model.engine.oil_count
        oil_cost = oil_price * oil_quantity
        parts_cost = (sender.objects.filter(maintenance_id=instance.id)
                      .aggregate(Sum('part__price')).get('part__price__sum'))
        total_cost = working_price + oil_cost + parts_cost \
            if parts_cost else working_price + oil_cost
        Maintenance.objects.filter(pk=instance.pk).update(total_cost=total_cost)


